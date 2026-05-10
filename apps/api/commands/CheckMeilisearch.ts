import { BaseCommand } from "@adonisjs/core/ace"
import { isMeiliHealthy, productsIndex } from "#lib/meilisearch"

export default class CheckMeilisearch extends BaseCommand {
  static commandName = "meilisearch:health"
  static description = "Check Meilisearch connection and index status"

  async run() {
    const healthy = await isMeiliHealthy()

    if (!healthy) {
      this.logger.error("Meilisearch is unreachable")
      return
    }

    try {
      const stats = await productsIndex.getStats()
      this.logger.info(
        `Meilisearch is reachable. Index "products" has ${stats.numberOfDocuments} document(s).`,
      )
    } catch {
      this.logger.info(
        'Meilisearch is reachable but index "products" does not exist or is not accessible.',
      )
    }
  }
}
