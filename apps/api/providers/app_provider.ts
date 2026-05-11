import type { ApplicationService } from "@adonisjs/core/types"
import logger from "@adonisjs/core/services/logger"

import { db } from "#config/database"
import meiliClient, {
  productsIndex,
  meiliState,
  isMeiliHealthy,
  isIndexNotFoundError,
} from "#lib/meilisearch"
import { CategoryService } from "#services/CategoryService"
import { OriginService } from "#services/OriginService"
import { ParcelCalculationService } from "#services/ParcelCalculationService"
import { fullReindex } from "#services/ProductIndexer"
import { ProductService } from "#services/ProductService"
import { TerritoryService } from "#services/TerritoryService"
// import { TransporterRulesService } from "#services/TransporterRulesService"
import { TransporterService } from "#services/TransporterService"

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(ProductService, () => {
      return new ProductService(db)
    })

    this.app.container.singleton(CategoryService, () => {
      return new CategoryService(db)
    })

    // this.app.container.singleton(TransporterRulesService, () => {
    //   return new TransporterRulesService(db)
    // })

    this.app.container.singleton(ParcelCalculationService, () => {
      return new ParcelCalculationService(db)
    })

    this.app.container.singleton(OriginService, () => {
      return new OriginService(db)
    })

    this.app.container.singleton(TerritoryService, () => {
      return new TerritoryService(db)
    })

    this.app.container.singleton(TransporterService, () => {
      return new TransporterService(db)
    })
  }

  async start() {
    const healthy = await isMeiliHealthy()

    if (!healthy) {
      logger.warn(
        "Meilisearch unavailable at startup — search will be disabled. " +
          "Check MEILI_HOST (%s) and ensure the server is running.",
        process.env.MEILI_HOST ?? "http://localhost:7700",
      )
      return
    }

    await this.#initIndex(0)
  }

  /**
   * Initialize the products index with retry on transient errors.
   *
   * @param attempt - Current attempt number (0-indexed, max 3 retries)
   */
  async #initIndex(attempt: number): Promise<void> {
    const MAX_RETRIES = 3

    try {
      const stats = await productsIndex.getStats()

      if (stats.numberOfDocuments === 0) {
        logger.info("Meilisearch index is empty, running full reindex...")
        await fullReindex()
        logger.info("Meilisearch reindex complete")
      } else {
        logger.info("Meilisearch index ready (%d documents)", stats.numberOfDocuments)
      }

      meiliState.available = true
    } catch (error) {
      if (isIndexNotFoundError(error)) {
        try {
          logger.info("Meilisearch index not found — creating and reindexing...")
          await meiliClient.createIndex("products", { primaryKey: "id" })
          await fullReindex()
          logger.info("Meilisearch reindex complete")
          meiliState.available = true
        } catch (createError) {
          logger.warn(
            "Meilisearch index creation failed — search will be disabled: %O",
            createError,
          )
        }
        return
      }

      if (attempt < MAX_RETRIES) {
        const delay = 2 ** attempt * 1000 // 1s, 2s, 4s
        logger.warn(
          "Meilisearch connection attempt %d failed, retrying in %dms: %O",
          attempt + 1,
          delay,
          error,
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
        return this.#initIndex(attempt + 1)
      }

      logger.warn(
        "Meilisearch unavailable after %d retries — search will be disabled: %O",
        MAX_RETRIES,
        error,
      )
    }
  }
}
