import logger from "@adonisjs/core/services/logger"
import { meiliState, productsIndex } from "#lib/meilisearch"

export interface ProductDocument {
  id: string
  productName: string
  categoryName: string
  categoryID: string
}

/**
 * Retry an async operation with exponential backoff.
 * @param fn - The async function to retry.
 * @param label - Human-readable label for logging.
 * @param maxRetries - Maximum number of retries (default: 3).
 */
async function retryWithBackoff(
  fn: () => Promise<void>,
  label: string,
  maxRetries = 3,
): Promise<void> {
  if (!meiliState.available) {
    logger.debug("Meilisearch unavailable — skipping %s", label)
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
          "Meilisearch %s - attempt %d/%d failed, retrying in %dms: %O",
          label,
          attempt + 1,
          maxRetries,
          delay,
          error,
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
      } else {
        logger.error("Meilisearch %s - FAILED after %d retries: %O", label, maxRetries, error)
      }
    }
  }
}

export async function onProductCreated(doc: ProductDocument) {
  await retryWithBackoff(
    () => productsIndex.addDocuments([doc]).then(() => {}),
    `add product ${doc.id}`,
  )
}

export async function onProductUpdated(doc: ProductDocument) {
  await retryWithBackoff(
    () => productsIndex.updateDocuments([doc]).then(() => {}),
    `update product ${doc.id}`,
  )
}

export async function onProductDeleted(productID: string) {
  await retryWithBackoff(
    () => productsIndex.deleteDocument(productID).then(() => {}),
    `delete product ${productID}`,
  )
}
