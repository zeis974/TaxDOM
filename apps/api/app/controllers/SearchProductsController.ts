import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { productsIndex, meiliState } from "#lib/meilisearch"
import { BadRequestError, NotFoundError } from "#exceptions/ServiceErrors"
import { SearchProductsValidator } from "#validators/SearchProductsValidator"

interface MeiliProductHit {
  productName: string
  id: string
  categoryName: string
}

const ENUMERATION_PATTERNS = [
  /^[a-zA-Z0-9]$/, // single character (caught by validator, defense in depth)
  /^(.)\1{2,}$/, // repeated same char 3+ times: "aaa", "bbbb"
  /^(.)\1(.)\2$/, // two different chars repeated: "aabb", "xxyy"
]

function isEnumerationAttempt(q: string): boolean {
  return ENUMERATION_PATTERNS.some((pattern) => pattern.test(q))
}

export default class SearchProductsController {
  async handle({ request, response }: HttpContext) {
    if (!meiliState.available) {
      return response.status(503).json({ error: "Search unavailable" })
    }

    const filters = await request.validateUsing(SearchProductsValidator)
    const productName = filters.name.trim()

    if (isEnumerationAttempt(productName)) {
      logger.warn("Blocked enumeration attempt: q='%s' from %s", productName, request.ip())
      throw new BadRequestError("Invalid query")
    }

    try {
      const results = await productsIndex.search<MeiliProductHit>(productName, {
        limit: 10,
        attributesToRetrieve: ["productName"],
      })

      if (!results.hits.length) {
        throw new NotFoundError("No product found")
      }

      logger.info(
        "Meilisearch product search: '%s' -> %d results",
        productName,
        results.hits.length,
      )

      return results.hits.map((hit) => ({ name: hit.productName }))
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error
      }

      logger.error("Meilisearch search failed: %O", error)
      return response.status(503).json({ error: "Search unavailable" })
    }
  }
}
