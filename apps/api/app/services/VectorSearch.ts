import logger from "@adonisjs/core/services/logger"

import { chromaState, getCollection } from "#lib/chroma"
import { createEmbeddingService } from "#services/EmbeddingService"

export type VectorHit = {
  productName: string
  categoryID: string
  categoryName: string
  /** Cosine distance (lower = closer). Rows are already returned best-first. */
  distance: number
}

/**
 * Maximum cosine distance (BGE-M3) for a hit to count as relevant. KNN always
 * returns the nearest neighbours even when they are unrelated, so without this
 * cutoff "casque" would still match "iphone" on a sparse catalogue. Measured
 * separation: same-family queries sit ≤ 0.45, unrelated ones ≥ 0.57.
 */
const MAX_DISTANCE = 0.55

/**
 * Semantic nearest-neighbour search over the products collection. The query
 * text is embedded with Ollama, then matched against the catalogue in Chroma.
 * Hits beyond `maxDistance` are dropped so irrelevant nearest neighbours don't
 * leak through. Returns an empty list (never throws) when Chroma/Ollama are
 * unavailable so callers degrade gracefully.
 */
export async function searchSimilarProducts(
  text: string,
  { limit = 10, maxDistance = MAX_DISTANCE }: { limit?: number; maxDistance?: number } = {},
): Promise<VectorHit[]> {
  if (!chromaState.available) return []

  try {
    const embedder = createEmbeddingService()
    const queryEmbedding = await embedder.embed(text)

    const collection = await getCollection()
    // Classic `query()` API: the self-hosted Chroma server's local executor does
    // not implement the newer `search()`/`Knn` builder. Results are arrays-of-
    // arrays (one entry per query embedding), already ordered best-first.
    const result = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: limit,
    })

    const metadatas = result.metadatas[0] ?? []
    const distances = result.distances?.[0] ?? []
    return metadatas
      .map((metadata, i) => ({
        productName: String(metadata?.productName ?? ""),
        categoryID: String(metadata?.categoryID ?? ""),
        categoryName: String(metadata?.categoryName ?? ""),
        // Missing distance → treat as infinitely far so it's excluded by the
        // maxDistance cutoff, never mistaken for a perfect (0) match.
        distance: distances[i] ?? Number.POSITIVE_INFINITY,
      }))
      .filter((hit) => hit.categoryID && hit.distance <= maxDistance)
  } catch (error) {
    logger.error("[VECTOR] search failed for '%s': %O", text, error)
    return []
  }
}
