import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"

import { BadRequestError, ServiceUnavailableError } from "#exceptions/ServiceErrors"
import { chromaState } from "#lib/chroma"
import { searchSimilarProducts } from "#services/VectorSearch"
import { SearchProductsValidator } from "#validators/SearchProductsValidator"

const SEARCH_LIMIT = 10

const ENUMERATION_PATTERNS = [
  /^[a-zA-Z0-9]$/, // single character (caught by validator, defense in depth)
  /^(.)\1{2,}$/, // repeated same char 3+ times: "aaa", "bbbb"
  /^(.)\1(.)\2$/, // two different chars repeated: "aabb", "xxyy"
]

function isEnumerationAttempt(q: string): boolean {
  return ENUMERATION_PATTERNS.some((pattern) => pattern.test(q))
}

export default class SearchProductsController {
  async handle({ request }: HttpContext) {
    if (!chromaState.available) {
      throw new ServiceUnavailableError("Recherche indisponible")
    }

    const filters = await request.validateUsing(SearchProductsValidator)
    const productName = filters.name.trim()

    if (isEnumerationAttempt(productName)) {
      logger.warn("Blocked enumeration attempt: q='%s' from %s", productName, request.ip())
      throw new BadRequestError("Invalid query")
    }

    const hits = await searchSimilarProducts(productName, { limit: SEARCH_LIMIT })

    // No match is a valid, successful outcome (200 with an empty list, not a
    // 404). The `{ success, data }` envelope mirrors the error shape so clients
    // always get a consistent, self-describing payload.
    logger.info("Vector product search: '%s' -> %d results", productName, hits.length)

    return {
      success: true as const,
      data: hits.map((hit) => ({ name: hit.productName })),
    }
  }
}
