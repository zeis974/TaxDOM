import * as meilisearch from "meilisearch"

const MeiliSearch = meilisearch.Meilisearch
const client = new MeiliSearch({
  host: process.env.MEILI_HOST ?? "http://localhost:7700",
  apiKey: process.env.MEILI_MASTER_KEY,
})

export const productsIndex = client.index("products")

export async function getMeiliHealth() {
  try {
    return await client.health()
  } catch {
    return null
  }
}

export default client
