import type { HttpContext } from "@adonisjs/core/http"
import { productsIndex } from "#lib/meilisearch"
import logger from "@adonisjs/core/services/logger"

interface ProductSearchHit {
  id: string
  productName: string
  categoryName: string
}

export default class ProductsSearchController {
  async handle({ request, response }: HttpContext) {
    const q = request.qs().q ?? ""

    if (!q.trim()) {
      return response.json([])
    }

    if (q.length > 200) {
      return response.badRequest({ error: "Query too long" })
    }

    try {
      const results = await productsIndex.search<ProductSearchHit>(q, {
        limit: 10,
        attributesToHighlight: ["productName"],
        highlightPreTag: "<mark>",
        highlightPostTag: "</mark>",
      })

      logger.info("Product search: q='%s' -> %d results", q, results.hits.length)

      return response.json(
        results.hits.map((hit) => ({
          id: hit.id,
          name: hit.productName,
          category: hit.categoryName,
        })),
      )
    } catch (error) {
      logger.error("Meilisearch search failed: %O", error)
      return response.status(503).json({ error: "Search unavailable" })
    }
  }
}
