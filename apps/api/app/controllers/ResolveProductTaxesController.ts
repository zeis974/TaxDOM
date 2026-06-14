import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import type {
  ProductTaxesSimulatorResult,
  ResolvedCategoryCandidate,
  ResolveProductTaxesResult,
} from "@taxdom/types"

import { db } from "#config/database"
import { BadRequestError, NotFoundError } from "#exceptions/ServiceErrors"
import { GetProductTaxesService } from "#services/GetProductTaxesService"
// Value import (not `import type`): @inject() needs the runtime class for DI metadata.
import { ResolveProductCategoryService } from "#services/ResolveProductCategoryService"
import { ResolveProductTaxesValidator } from "#validators/ResolveProductTaxesValidator"

/**
 * Unified entry point for the product-tax simulator: accepts a free-text name
 * OR a merchant URL, resolves it to a curated category (semantic search via
 * Chroma), and returns the taxes directly when the resolution is confident. When several
 * categories match, each candidate is returned WITH its taxes precomputed, so
 * the user can pick client-side without a second request (and second captcha).
 */
@inject()
export default class ResolveProductTaxesController {
  constructor(private resolver: ResolveProductCategoryService) {}

  async handle({ request }: HttpContext) {
    const payload = await request.validateUsing(ResolveProductTaxesValidator)

    if (!payload.name && !payload.url) {
      throw new BadRequestError("Renseignez un nom de produit ou une URL")
    }

    const taxesService = new GetProductTaxesService(db)
    const resolution = await this.resolver.resolve({ query: payload.name, url: payload.url })

    // Exact product hit → product path first (honours per-product overrides),
    // falling back to the category rate if no product exists for this
    // origin/territory pair.
    if (resolution.exactProduct) {
      const exact = resolution.exactProduct
      let taxes: ProductTaxesSimulatorResult
      try {
        taxes = await taxesService.getTaxesForProduct({
          product: exact.productName,
          origin: payload.origin,
          territory: payload.territory,
        })
      } catch (err) {
        if (!(err instanceof NotFoundError)) throw err
        logger.info(
          "[RESOLVE] no product row for '%s' (%s/%s), falling back to category",
          exact.productName,
          payload.origin,
          payload.territory,
        )
        taxes = await taxesService.getTaxesForCategory({
          categoryID: exact.categoryID,
          label: exact.categoryName,
          origin: payload.origin,
          territory: payload.territory,
        })
      }

      return {
        query: resolution.query,
        resolvedLabel: taxes.product,
        taxes: taxes.taxes,
        candidates: [],
      } satisfies ResolveProductTaxesResult
    }

    // Single confident category → compute it directly.
    if (resolution.candidates.length === 1) {
      const only = resolution.candidates[0]
      const taxes = await taxesService.getTaxesForCategory({
        categoryID: only.categoryID,
        label: only.categoryName,
        origin: payload.origin,
        territory: payload.territory,
      })
      return {
        query: resolution.query,
        resolvedLabel: taxes.product,
        taxes: taxes.taxes,
        candidates: [],
      } satisfies ResolveProductTaxesResult
    }

    // Several categories → precompute taxes for each so the user can pick
    // client-side. Empty array means nothing was recognised.
    const candidates: ResolvedCategoryCandidate[] = await Promise.all(
      resolution.candidates.map(async (candidate) => {
        const taxes = await taxesService.getTaxesForCategory({
          categoryID: candidate.categoryID,
          label: candidate.categoryName,
          origin: payload.origin,
          territory: payload.territory,
        })
        return {
          categoryID: candidate.categoryID,
          categoryName: candidate.categoryName,
          taxes: taxes.taxes,
        }
      }),
    )

    return {
      query: resolution.query,
      candidates,
    } satisfies ResolveProductTaxesResult
  }
}
