import { ChromaClient, type Collection } from "chromadb"

import { chromaConfig } from "#config/chroma"

/**
 * Chroma client singleton + runtime state. We pass pre-computed embeddings
 * (from Ollama) to every operation, so the collection is created WITHOUT a
 * server-side embedding function (`embeddingFunction: null`). Cosine space
 * matches BGE-M3.
 */

const client = new ChromaClient({
  host: chromaConfig.host,
  port: chromaConfig.port,
  ssl: chromaConfig.ssl,
})

/**
 * Chroma runtime state. `available` is set to `true` by the ChromaProvider once
 * the server is reachable and the collection is ready. Consumers short-circuit
 * (graceful degradation) when it is `false`.
 */
export const chromaState = { available: false }

let collectionPromise: Promise<Collection> | null = null

/**
 * Lazily resolves (and memoizes) the products collection, creating it with the
 * cosine HNSW space on first access. Idempotent: `getOrCreateCollection` is a
 * no-op when the collection already exists.
 */
export async function getCollection(): Promise<Collection> {
  if (!collectionPromise) {
    collectionPromise = client
      .getOrCreateCollection({
        name: chromaConfig.collection,
        configuration: { hnsw: { space: "cosine" } },
        embeddingFunction: null,
      })
      .catch((err) => {
        collectionPromise = null
        throw err
      })
  }
  return collectionPromise
}

/** Heartbeat check that never throws. */
export async function isChromaHealthy(): Promise<boolean> {
  try {
    await client.heartbeat()
    return true
  } catch {
    return false
  }
}

export default client
