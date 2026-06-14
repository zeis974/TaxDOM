import { BaseCommand } from "@adonisjs/core/ace"
import type { CommandOptions } from "@adonisjs/core/types/ace"

import { reindexAll } from "#services/VectorIndexer"

export default class VectorReindex extends BaseCommand {
  static commandName = "vector:reindex"
  static description = "Réindexe tout le catalogue produits dans Chroma (embeddings Ollama)"
  static options: CommandOptions = { startApp: true }

  async run() {
    this.logger.info("Réindexation vectorielle du catalogue...")
    const count = await reindexAll()
    this.logger.success(`${count} produit(s) indexé(s) dans Chroma`)
  }
}
