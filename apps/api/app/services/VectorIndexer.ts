import logger from "@adonisjs/core/services/logger"
import { eq } from "drizzle-orm"

import { db } from "#config/database"
import { categories, products } from "#database/schema"
import { getCollection } from "#lib/chroma"
import { createEmbeddingService } from "#services/EmbeddingService"

const BATCH_SIZE = 100

/** Text fed to the embedder for a product (name + category context). */
export function productEmbeddingText(productName: string, categoryName: string | null): string {
  return categoryName ? `${productName} — ${categoryName}` : productName
}

type ProductRow = {
  id: string
  productName: string
  categoryName: string | null
  categoryID: string | null
}

async function upsertBatch(rows: ProductRow[]): Promise<void> {
  const embedder = createEmbeddingService()
  const collection = await getCollection()

  const texts = rows.map((r) => productEmbeddingText(r.productName, r.categoryName))
  const embeddings = await embedder.embedBatch(texts)

  await collection.upsert({
    ids: rows.map((r) => r.id),
    embeddings,
    documents: texts,
    metadatas: rows.map((r) => ({
      productName: r.productName,
      categoryID: r.categoryID ?? "",
      categoryName: r.categoryName ?? "",
    })),
  })
}

/**
 * Embeds and upserts the entire catalogue into Chroma, in batches. Used at boot
 * (when the collection is empty) and by `node ace vector:reindex`.
 */
export async function reindexAll(): Promise<number> {
  const rows = await db
    .select({
      id: products.productID,
      productName: products.productName,
      categoryName: categories.categoryName,
      categoryID: products.categoryID,
    })
    .from(products)
    .leftJoin(categories, eq(categories.categoryID, products.categoryID))

  if (rows.length === 0) {
    logger.info("[VECTOR] no products to index")
    return 0
  }

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE)
    await upsertBatch(batch)
    logger.info(
      "[VECTOR] indexed %d/%d products",
      Math.min(i + BATCH_SIZE, rows.length),
      rows.length,
    )
  }

  return rows.length
}
