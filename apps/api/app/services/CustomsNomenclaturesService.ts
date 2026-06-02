import { eq, ilike, sql } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"

import type * as schema from "#database/schema"
import { customsNomenclatures } from "#database/schema"
import { NotFoundError } from "#exceptions/ServiceErrors"
import meiliClient, { meiliState } from "#lib/meilisearch"

type DB = NodePgDatabase<typeof schema>

export type ChapterSummary = {
  chapter: number
  description: string
  productCount: number
}

export type NomenclatureNode = {
  code: string
  description: string
  alinea: number
  type: number
  productCount: number
  children: NomenclatureNode[]
}

export type NomenclatureSearchResult = {
  code: string
  description: string
  chapter: number
  alinea: number
  parentCode: string | null
}

export type ProductSummary = {
  productID: string
  productName: string
  categoryName: string
  nomenclatureCode: string | null
}

export const nomenclaturesIndex = meiliClient.index("customs_nomenclatures")

export class CustomsNomenclaturesService {
  constructor(private db: DB) {}

  async listChapters(): Promise<ChapterSummary[]> {
    // Get one representative description per chapter (the root code matching the chapter)
    const rows = await this.db.execute<{
      chapter: number
      description: string
      product_count: number
    }>(sql`
      SELECT
        cn.chapter,
        COALESCE(
          (SELECT description FROM customs_nomenclatures
           WHERE chapter = cn.chapter
             AND code = LPAD(cn.chapter::text, 2, '0') || '00000000'
           LIMIT 1),
          (SELECT description FROM customs_nomenclatures
           WHERE chapter = cn.chapter
           ORDER BY char_length(code) ASC, code ASC LIMIT 1),
          ''
        ) AS description,
        COUNT(DISTINCT p.product_id)::int AS product_count
      FROM (SELECT DISTINCT chapter FROM customs_nomenclatures) cn
      LEFT JOIN products p ON p.nomenclature_code LIKE (LPAD(cn.chapter::text, 2, '0') || '%')
      GROUP BY cn.chapter
      ORDER BY cn.chapter
    `)

    return rows.rows.map((r) => ({
      chapter: r.chapter,
      description: r.description,
      productCount: r.product_count,
    }))
  }

  async getTree(chapter: number): Promise<NomenclatureNode> {
    if (chapter < 1 || chapter > 99) {
      throw new NotFoundError(`Chapter ${chapter} does not exist`)
    }

    const rows = await this.db
      .select()
      .from(customsNomenclatures)
      .where(eq(customsNomenclatures.chapter, chapter))

    if (rows.length === 0) {
      throw new NotFoundError(`Chapter ${chapter} not found in nomenclature — run rita:sync first`)
    }

    // Get product counts per code prefix
    const productCountRows = await this.db.execute<{ code: string; cnt: number }>(sql`
      SELECT nomenclature_code AS code, COUNT(*)::int AS cnt
      FROM products
      WHERE nomenclature_code LIKE ${String(chapter).padStart(2, "0") + "%"}
        AND nomenclature_code IS NOT NULL
      GROUP BY nomenclature_code
    `)

    const directCounts = new Map<string, number>()
    for (const r of productCountRows.rows) {
      directCounts.set(r.code, r.cnt)
    }

    // Build a map of code → node
    const nodeMap = new Map<string, NomenclatureNode>()

    // First pass: create nodes with direct product counts
    for (const row of rows) {
      nodeMap.set(row.code, {
        code: row.code,
        description: row.description,
        alinea: row.alinea,
        type: row.type,
        productCount: directCounts.get(row.code) ?? 0,
        children: [],
      })
    }

    // Second pass: build the tree and propagate counts upward
    let root: NomenclatureNode | null = null

    for (const row of rows) {
      const node = nodeMap.get(row.code)!

      if (row.parentCode && nodeMap.has(row.parentCode)) {
        nodeMap.get(row.parentCode)!.children.push(node)
      } else if (!row.parentCode) {
        root = node
      }
    }

    // If no clear root, pick the shortest code
    if (!root) {
      let shortestCode = rows[0].code
      for (const row of rows) {
        if (row.code.length < shortestCode.length) shortestCode = row.code
      }
      root = nodeMap.get(shortestCode)!
    }

    // Propagate product counts from leaves to root
    propagateCounts(root)

    // Sort children by code at every level
    sortChildren(root)

    return root
  }

  async search(query: string): Promise<NomenclatureSearchResult[]> {
    if (meiliState.available) {
      try {
        const results = await nomenclaturesIndex.search<NomenclatureSearchResult>(query, {
          limit: 20,
          attributesToRetrieve: ["code", "description", "chapter", "alinea", "parentCode"],
        })
        return results.hits
      } catch {
        // Fallback to DB search if Meilisearch is unavailable
      }
    }

    const rows = await this.db
      .select({
        code: customsNomenclatures.code,
        description: customsNomenclatures.description,
        chapter: customsNomenclatures.chapter,
        alinea: customsNomenclatures.alinea,
        parentCode: customsNomenclatures.parentCode,
      })
      .from(customsNomenclatures)
      .where(ilike(customsNomenclatures.description, `%${query}%`))
      .limit(20)

    return rows.map((r) => ({
      ...r,
      chapter: r.chapter ?? 0,
      alinea: r.alinea ?? 0,
    }))
  }

  /**
   * Lists every product whose nomenclature code starts with the given prefix.
   * Filtering happens in SQL (LIKE 'prefix%') so the drawer is no longer limited
   * to a single page of unfiltered products.
   */
  async listProductsByPrefix(prefix: string): Promise<ProductSummary[]> {
    const rows = await this.db.execute<{
      product_id: string
      product_name: string
      category_name: string
      nomenclature_code: string | null
    }>(sql`
      SELECT
        p.product_id,
        p.product_name,
        c.category_name,
        p.nomenclature_code
      FROM products p
      JOIN categories c ON c.category_id = p.category_id
      WHERE p.nomenclature_code LIKE ${prefix + "%"}
      ORDER BY p.nomenclature_code, p.product_name
    `)

    return rows.rows.map((r) => ({
      productID: r.product_id,
      productName: r.product_name,
      categoryName: r.category_name,
      nomenclatureCode: r.nomenclature_code,
    }))
  }

  async reindexToMeilisearch(): Promise<void> {
    const rows = await this.db
      .select({
        code: customsNomenclatures.code,
        description: customsNomenclatures.description,
        chapter: customsNomenclatures.chapter,
        alinea: customsNomenclatures.alinea,
        parentCode: customsNomenclatures.parentCode,
      })
      .from(customsNomenclatures)

    if (rows.length === 0) return

    const BATCH_SIZE = 1000
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE).map((r) => ({
        id: r.code,
        code: r.code,
        description: r.description,
        chapter: r.chapter,
        alinea: r.alinea,
        parentCode: r.parentCode,
      }))
      await nomenclaturesIndex.addDocuments(batch, { primaryKey: "id" })
    }
  }

  async configureIndex(): Promise<void> {
    await nomenclaturesIndex.updateSettings({
      searchableAttributes: ["description", "code"],
      displayedAttributes: ["code", "description", "chapter", "alinea", "parentCode"],
      sortableAttributes: ["code", "chapter"],
      filterableAttributes: ["chapter", "alinea"],
      typoTolerance: {
        enabled: true,
        minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 },
      },
      rankingRules: ["words", "typo", "proximity", "attribute", "sort", "exactness"],
    })
  }
}

function sortChildren(node: NomenclatureNode): void {
  node.children.sort((a, b) => a.code.localeCompare(b.code))
  for (const child of node.children) sortChildren(child)
}

function propagateCounts(node: NomenclatureNode): number {
  let total = node.productCount
  for (const child of node.children) {
    total += propagateCounts(child)
  }
  node.productCount = total
  return total
}
