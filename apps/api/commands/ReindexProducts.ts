import { BaseCommand } from "@adonisjs/core/ace"
import { fullReindex } from "#services/ProductIndexer"

export default class ReindexProducts extends BaseCommand {
  static commandName = "products:reindex"
  static description = "Reindex all products in Meilisearch"

  async run() {
    this.logger.info("Starting products reindexation...")
    await fullReindex()
    this.logger.info("Products reindexed successfully")
  }
}
