import logger from "@adonisjs/core/services/logger"
import type { ApplicationService } from "@adonisjs/core/types"

import { chromaConfig } from "#config/chroma"
import { chromaState, getCollection, isChromaHealthy } from "#lib/chroma"
import { reindexAll } from "#services/VectorIndexer"

const MAX_RETRIES = 3

/**
 * Boots the Chroma vector store: waits for the server, ensures the products
 * collection exists, and seeds it from Postgres when empty. Failures degrade
 * gracefully (semantic search disabled) — they never block app startup.
 */
export default class ChromaProvider {
  constructor(protected app: ApplicationService) {}

  async start() {
    await this.#init(0)
  }

  async #init(attempt: number): Promise<void> {
    const healthy = await isChromaHealthy()

    if (!healthy) {
      if (attempt < MAX_RETRIES) {
        const delay = 2 ** attempt * 1000 // 1s, 2s, 4s
        logger.warn(
          "Chroma unreachable (attempt %d/%d), retrying in %dms — check CHROMA_URL (%s)",
          attempt + 1,
          MAX_RETRIES,
          delay,
          chromaConfig.host,
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
        return this.#init(attempt + 1)
      }
      logger.warn(
        "Chroma unavailable after %d retries — semantic search disabled. Products resolve/search will be unavailable.",
        MAX_RETRIES,
      )
      return
    }

    try {
      const collection = await getCollection()
      const count = await collection.count()

      if (count === 0) {
        logger.info("Chroma collection empty — indexing catalogue from Postgres...")
        const indexed = await reindexAll()
        logger.info("Chroma indexing complete (%d products)", indexed)
      } else {
        logger.info("Chroma collection ready (%d products)", count)
      }

      chromaState.available = true
    } catch (error) {
      logger.warn("Chroma collection init failed — semantic search disabled: %O", error)
    }
  }
}
