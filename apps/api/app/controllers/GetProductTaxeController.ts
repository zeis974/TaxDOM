import type { HttpContext } from "@adonisjs/core/http"
import type { Origin, TaxSimulatorResult, Territory } from "@taxdom/types"
import logger from "@adonisjs/core/services/logger"
import { and, eq } from "drizzle-orm"

import { db } from "#config/database"
import { products, taxes } from "#database/schema"
import { GetProductTaxeValidator } from "#validators/GetProductTaxeValidator"

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
    const data = request.body()
    const payload = await GetProductTaxeValidator.validate(data)

    const product = payload.product.toLowerCase()
    const origin = payload.origin.toUpperCase() as Origin
    const territory = payload.territory.toUpperCase() as Territory

    try {
      const result = await db
        .select({
          tva: taxes.tva,
          om: taxes.om,
          omr: taxes.omr,
        })
        .from(products)
        .innerJoin(taxes, eq(products.taxID, taxes.taxID))
        .where(
          and(
            eq(products.productName, product),
            eq(products.originID, originMap[origin]),
            eq(products.territoryID, territoryMap[territory]),
          ),
        )

      if (result.length === 0) {
        logger.error("[PRODUCT NOT FOUND] Fetching (%s) taxes in getProductTaxeController", product)

        return { error: "Product not found" }
      }

      logger.info("Fetching (%s) taxes in getProductTaxeController", product)

      const res: TaxSimulatorResult = {
        product,
        taxes: {
          tva: result[0].tva,
          om: result[0].om,
          omr: result[0].omr,
        },
      }

      return res
    } catch (err) {
      logger.error({ err: err }, "Cannot getProductTaxes")
    }
  }
}
