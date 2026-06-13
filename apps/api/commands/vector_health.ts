import { BaseCommand } from "@adonisjs/core/ace"
import type { CommandOptions } from "@adonisjs/core/types/ace"

import { ollamaConfig } from "#config/chroma"
import { getCollection, isChromaHealthy } from "#lib/chroma"
import { createEmbeddingService } from "#services/EmbeddingService"

export default class VectorHealth extends BaseCommand {
  static commandName = "vector:health"
  static description = "Vérifie Chroma (heartbeat), Ollama (embedding test) et la collection"
  static options: CommandOptions = { startApp: true }

  async run() {
    const healthy = await isChromaHealthy()
    if (!healthy) {
      this.logger.error("Chroma injoignable")
      this.exitCode = 1
      return
    }
    this.logger.success("Chroma OK")

    try {
      const vector = await createEmbeddingService().embed("test")
      this.logger.success(`Ollama OK (modèle ${ollamaConfig.model}, dimension ${vector.length})`)
      if (vector.length !== ollamaConfig.dim) {
        this.logger.warning(
          `Dimension inattendue : ${vector.length} ≠ EMBEDDING_DIM (${ollamaConfig.dim})`,
        )
      }
    } catch (error) {
      this.logger.error(`Ollama KO : ${error instanceof Error ? error.message : String(error)}`)
      this.exitCode = 1
      return
    }

    const collection = await getCollection()
    this.logger.info(`Collection "${collection.name}" : ${await collection.count()} document(s)`)
  }
}
