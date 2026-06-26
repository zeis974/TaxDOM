import logger from "@adonisjs/core/services/logger"
import { Ollama } from "ollama"

import { ollamaConfig } from "#config/chroma"
import type { EmbeddingService } from "#services/EmbeddingService"

const MAX_BATCH = 50
const MAX_RETRIES = 3

/**
 * Embeds text with a self-hosted Ollama model (BGE-M3, 1024 dims). This is an
 * embedder only — no generation, no LLM. Transient failures (network / 5xx /
 * 429) are retried with exponential backoff.
 */
export class OllamaEmbeddingService implements EmbeddingService {
  private client = new Ollama({ host: ollamaConfig.host })

  async embed(text: string): Promise<number[]> {
    const [vector] = await this.embedBatch([text])
    return vector
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    const out: number[][] = []
    for (let i = 0; i < texts.length; i += MAX_BATCH) {
      const chunk = texts.slice(i, i + MAX_BATCH)
      const res = await this.withRetry(() =>
        this.client.embed({ model: ollamaConfig.model, input: chunk }),
      )
      out.push(...res.embeddings)
    }
    return out
  }

  private async withRetry<T>(fn: () => Promise<T>): Promise<T> {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await fn()
      } catch (error) {
        if (attempt === MAX_RETRIES) throw error
        const delay = 2 ** attempt * 1000 // 1s, 2s, 4s
        logger.warn(
          "[EMBED] attempt %d/%d failed, retrying in %dms: %O",
          attempt + 1,
          MAX_RETRIES,
          delay,
          error,
        )
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
    // Unreachable — the loop either returns or throws.
    throw new Error("unreachable")
  }
}
