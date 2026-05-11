import { ErrorStatusCode, Meilisearch, MeilisearchApiError } from "meilisearch"
import env from "#start/env"

const client = new Meilisearch({
  host: env.get("MEILI_HOST"),
  apiKey: env.get("MEILI_MASTER_KEY"),
  timeout: 5_000,
})

export const productsIndex = client.index("products")

/**
 * Meilisearch runtime state.
 * `available` is set to `true` by the provider after successful startup
 * health check + index init. Mutable via `meiliState.available = true`.
 */
export const meiliState = { available: false }

/**
 * Performs a health check on the Meilisearch server.
 * Throws if the server is unreachable.
 */
export async function getMeiliHealth() {
  return client.health()
}

/**
 * Returns `true` if the Meilisearch server is healthy, `false` otherwise.
 * Does NOT throw on connection failure.
 */
export async function isMeiliHealthy() {
  return client.isHealthy()
}

/**
 * Type-safe check for "index_not_found" API errors.
 */
export function isIndexNotFoundError(error: unknown): boolean {
  return (
    error instanceof MeilisearchApiError && error.cause?.code === ErrorStatusCode.INDEX_NOT_FOUND
  )
}

export default client
