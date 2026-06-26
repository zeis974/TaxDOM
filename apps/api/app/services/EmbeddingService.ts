import { OllamaEmbeddingService } from "#services/OllamaEmbeddingService"

/**
 * Abstraction over the embedding backend. Only Ollama (BGE-M3) is implemented
 * today; the interface + factory keep room for another provider later without
 * touching the vector services.
 */
export interface EmbeddingService {
  /** Embeds a single text into a dense vector. */
  embed(text: string): Promise<number[]>
  /** Embeds many texts, preserving order. */
  embedBatch(texts: string[]): Promise<number[][]>
}

let instance: EmbeddingService | null = null

export function createEmbeddingService(): EmbeddingService {
  if (!instance) {
    instance = new OllamaEmbeddingService()
  }
  return instance
}
