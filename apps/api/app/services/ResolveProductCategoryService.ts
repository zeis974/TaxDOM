import logger from "@adonisjs/core/services/logger"

import { db } from "#config/database"
import { BadRequestError, UnsupportedMerchantError } from "#exceptions/ServiceErrors"
import { extractProductFromUrl } from "#services/MerchantUrlParser"
import { ProductService } from "#services/ProductService"

const SEARCH_LIMIT = 10
const MAX_CANDIDATES = 5

export type ResolveCategoryInput = {
  query?: string
  url?: string
}

export type ExactProduct = {
  productName: string
  categoryID: string
  categoryName: string
}

export type CategoryMatch = {
  categoryID: string
  categoryName: string
}

export type ResolveCategoryResult = {
  query: string
  exactProduct?: ExactProduct
  candidates: CategoryMatch[]
}

/**
 * Turns a free-text product name OR a merchant URL into curated category
 * candidates via a name search over the product catalogue. When a URL is given,
 * the product name is parsed directly from the URL slug (no scraping) —
 * unsupported hosts raise `UnsupportedMerchantError`.
 */
export class ResolveProductCategoryService {
  async resolve(input: ResolveCategoryInput): Promise<ResolveCategoryResult> {
    let query = input.query?.trim() ?? ""

    if (input.url) {
      const extracted = extractProductFromUrl(input.url)
      if (!extracted) {
        throw new UnsupportedMerchantError()
      }
      query = extracted.productName
    }

    if (query.length < 2) {
      throw new BadRequestError("Requête trop courte")
    }

    const hits = await new ProductService(db).searchByName(query, SEARCH_LIMIT)

    const exactHit = hits.find((hit) => hit.productName.toLowerCase() === query.toLowerCase())

    // Rank categories by how often they appear in the search hits,
    // keeping the best (lowest) hit position as the tie-breaker.
    const byCategory = new Map<
      string,
      { categoryID: string; categoryName: string; count: number; bestRank: number }
    >()
    hits.forEach((hit, rank) => {
      if (!hit.categoryID) return
      const existing = byCategory.get(hit.categoryID)
      if (existing) {
        existing.count += 1
      } else {
        byCategory.set(hit.categoryID, {
          categoryID: hit.categoryID,
          categoryName: hit.categoryName,
          count: 1,
          bestRank: rank,
        })
      }
    })

    const candidates: CategoryMatch[] = [...byCategory.values()]
      .sort((a, b) => b.count - a.count || a.bestRank - b.bestRank)
      .slice(0, MAX_CANDIDATES)
      .map(({ categoryID, categoryName }) => ({ categoryID, categoryName }))

    logger.info(
      "[RESOLVE] query='%s' hits=%d categories=%d exact=%s",
      query,
      hits.length,
      candidates.length,
      exactHit?.productName ?? "-",
    )

    return {
      query,
      exactProduct: exactHit
        ? {
            productName: exactHit.productName,
            categoryID: exactHit.categoryID,
            categoryName: exactHit.categoryName,
          }
        : undefined,
      candidates,
    }
  }
}
