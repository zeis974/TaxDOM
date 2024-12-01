import type { HttpContext } from "@adonisjs/core/http"
import type { Origin, TaxSimulatorFormLabel, Territory } from "#types/index"

import logger from "@adonisjs/core/services/logger"
import { and, eq } from "drizzle-orm"
import { db } from "#config/database"
import { ProductsTables, Taxes } from "#database/schema"

const originMap: Record<Origin, number> = {
  EU: 1,
  HORS_EU: 2,
}

const territoryMap: Record<Territory, number> = {
  CORSE: 1,
  FRANCE: 2,
  GUADELOUPE: 3,
  GUYANE: 4,
  MARTINIQUE: 5,
  MAYOTTE: 6,
  REUNION: 7,
}

export default class GetProductTaxeController {
  async handle({ request }: HttpContext) {
    const body = request.body() as TaxSimulatorFormLabel

    const product = body.product.toLowerCase()
    const origin = body.origin.toUpperCase() as Origin
    const territory = body.territory.toUpperCase() as Territory

    try {
      const result = await db
        .select({
          tva: Taxes.tva,
          om: Taxes.om,
          omr: Taxes.omr,
        })
        .from(ProductsTables)
        .innerJoin(Taxes, eq(ProductsTables.taxID, Taxes.taxID))
        .where(
          and(
            eq(ProductsTables.productName, product),
            eq(ProductsTables.originID, originMap[origin]),
            eq(ProductsTables.territoryID, territoryMap[territory]),
          ),
        )

      if (result.length === 0) {
        logger.error("[PRODUCT NOT FOUND] Fetching (%s) taxes in getProductTaxeController", product)

        return { error: "Product not found" }
      }

      logger.info("Fetching (%s) taxes in getProductTaxeController", product)

      return result[0]
    } catch (err) {
      logger.error({ err: err }, "Cannot getProductTaxes")
    }
  }
}
