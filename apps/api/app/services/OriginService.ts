import type { Origin } from "@taxdom/types"
import { asc, count, desc, eq, sql } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { v7 as uuidv7 } from "uuid"

import type * as schema from "#database/schema"
import { origins, products } from "#database/schema"
import { BadRequestError, ConflictError, NotFoundError } from "#exceptions/ServiceErrors"

type DB = NodePgDatabase<typeof schema>

export type OriginCountResult = {
  origins_count: number
}

export type OriginPublicResult = {
  name: string
  isEU: boolean
}

export type OriginWithProductCount = Origin & {
  productsCount: number
}

export type CreateOriginInput = {
  originName: string
  isEU: boolean
  available?: boolean
}

export type UpdateOriginInput = {
  originName?: string
  isEU?: boolean
  available?: boolean
}

export class OriginService {
  constructor(private db: DB) {}

  async count(): Promise<OriginCountResult> {
    const total = await this.db.select({ count: count() }).from(origins)
    return { origins_count: total[0].count }
  }

  async findPublicList(): Promise<OriginPublicResult[]> {
    const originsData = await this.db.query.origins.findMany({
      where: (origins, { eq }) => eq(origins.available, true),
      columns: {
        originName: true,
        isEU: true,
      },
      orderBy: (origins, { asc }) => [asc(origins.originName)],
    })

    return originsData.map((origin) => ({
      name: origin.originName,
      isEU: origin.isEU,
    }))
  }

  async findAllWithProductCount(): Promise<OriginWithProductCount[]> {
    const productsCountExpr = sql<number>`count(${products.productID})`.as("productsCount")

    const rows = await this.db
      .select({
        originID: origins.originID,
        name: origins.originName,
        available: origins.available,
        isEU: origins.isEU,
        productsCount: productsCountExpr,
      })
      .from(origins)
      .leftJoin(products, eq(products.originID, origins.originID))
      .groupBy(origins.originID, origins.originName, origins.available, origins.isEU)
      .orderBy(asc(origins.originName))

    return rows.map((row) => ({
      originID: row.originID,
      name: row.name,
      available: row.available,
      isEU: row.isEU,
      productsCount: Number(row.productsCount ?? 0),
    }))
  }

  async findTopByProductCount(): Promise<{ top_origins: OriginWithProductCount[] }> {
    const productsCountExpr = sql<number>`count(${products.productID})`.as("productsCount")

    const rows = await this.db
      .select({
        originID: origins.originID,
        originName: origins.originName,
        isEU: origins.isEU,
        productsCount: productsCountExpr,
      })
      .from(origins)
      .leftJoin(products, eq(products.originID, origins.originID))
      .where(eq(origins.available, true))
      .groupBy(origins.originID, origins.originName, origins.isEU)
      .having(sql`count(${products.productID}) > 0`)
      .orderBy(desc(sql`count(${products.productID})`))
      .limit(5)

    return {
      top_origins: rows.map((row) => ({
        originID: row.originID,
        name: row.originName,
        available: true,
        isEU: row.isEU,
        productsCount: Number(row.productsCount ?? 0),
      })),
    }
  }

  async create(input: CreateOriginInput): Promise<Origin> {
    const trimmedName = input.originName.trim().toUpperCase()
    const resolvedAvailable = input.available ?? true

    const existingOrigin = await this.db.query.origins.findFirst({
      where: (origins, { eq }) => eq(origins.originName, trimmedName),
    })

    if (existingOrigin) {
      throw new ConflictError("Une origine avec ce nom existe déjà")
    }

    const originID = uuidv7()
    const [newOrigin] = await this.db
      .insert(origins)
      .values({
        originID,
        originName: trimmedName,
        available: resolvedAvailable,
        isEU: input.isEU,
      })
      .returning()

    return {
      originID: newOrigin.originID,
      name: newOrigin.originName,
      available: newOrigin.available,
      isEU: newOrigin.isEU,
    }
  }

  async update(originId: string, input: UpdateOriginInput): Promise<Origin> {
    const updateData: Partial<typeof origins.$inferInsert> = {}

    if (input.originName) {
      updateData.originName = input.originName.trim().toUpperCase()
    }
    if (input.available !== undefined) {
      updateData.available = input.available
    }
    if (input.isEU !== undefined) {
      updateData.isEU = input.isEU
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestError("Aucune donnée à mettre à jour")
    }

    const [updated] = await this.db
      .update(origins)
      .set(updateData)
      .where(eq(origins.originID, originId))
      .returning()

    if (!updated) {
      throw new NotFoundError("Origine introuvable")
    }

    return {
      originID: updated.originID,
      name: updated.originName,
      available: updated.available,
      isEU: updated.isEU,
    }
  }

  async delete(originId: string): Promise<void> {
    try {
      const [deleted] = await this.db
        .delete(origins)
        .where(eq(origins.originID, originId))
        .returning()

      if (!deleted) {
        throw new NotFoundError("Origine introuvable")
      }
    } catch (err) {
      if (err && typeof err === "object" && "code" in err && err.code === "23503") {
        throw new ConflictError(
          "Impossible de supprimer l'origine car elle est utilisée par des produits",
        )
      }
      throw err
    }
  }
}
