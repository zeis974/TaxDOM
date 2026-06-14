import logger from "@adonisjs/core/services/logger"

import { chromaState, getCollection } from "#lib/chroma"
import { createEmbeddingService } from "#services/EmbeddingService"
import { productEmbeddingText } from "#services/VectorIndexer"

export interface ProductDocument {
  id: string
  productName: string
  categoryName: string
  categoryID: string
}

/**
 * Retry an async operation with exponential backoff. Short-circuits (no-op)
 * when Chroma is unavailable so product mutations never fail because the vector
 * store is down — the catalogue can be re-synced later via `vector:reindex`.
 */
async function retryWithBackoff(
  fn: () => Promise<void>,
  label: string,
  maxRetries = 3,
): Promise<void> {
  if (!chromaState.available) {
    logger.debug("[VECTOR] unavailable — skipping %s", label)
    return
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await fn()
      return
    } catch (error) {
      if (attempt < maxRetries) {
        const delay = 2 ** attempt * 1000 // 1s, 2s, 4s
        logger.warn(
          "[VECTOR] %s — attempt %d/%d failed, retrying in %dms: %O",
          label,
          attempt + 1,
          maxRetries,
          delay,
          error,
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
      } else {
        logger.error("[VECTOR] %s — FAILED after %d retries: %O", label, maxRetries, error)
      }
    }
  }
}

async function upsertProduct(doc: ProductDocument): Promise<void> {
  const embedder = createEmbeddingService()
  const collection = await getCollection()
  const text = productEmbeddingText(doc.productName)
  const [embedding] = await embedder.embedBatch([text])

  await collection.upsert({
    ids: [doc.id],
    embeddings: [embedding],
    documents: [text],
    metadatas: [
      {
        productName: doc.productName,
        categoryID: doc.categoryID,
        categoryName: doc.categoryName,
      },
    ],
  })
}

export async function onProductCreated(doc: ProductDocument): Promise<void> {
  await retryWithBackoff(() => upsertProduct(doc), `add product ${doc.id}`)
}

export async function onProductUpdated(doc: ProductDocument): Promise<void> {
  await retryWithBackoff(() => upsertProduct(doc), `update product ${doc.id}`)
}

export async function onProductDeleted(productID: string): Promise<void> {
  await retryWithBackoff(async () => {
    const collection = await getCollection()
    await collection.delete({ ids: [productID] })
  }, `delete product ${productID}`)
}
