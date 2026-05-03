import type { HttpContext } from "@adonisjs/core/http"
import type { TaxSimulatorResult, Territory } from "@taxdom/types"
import logger from "@adonisjs/core/services/logger"
import { and, eq } from "drizzle-orm"

import { db } from "#config/database"
import { categories, products, taxes } from "#database/schema"
import { GetProductTaxeValidator } from "#validators/GetProductTaxeValidator"
import { isEUCountry } from "#lib/isEU"

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
    const payload = await request.validateUsing(GetProductTaxeValidator)

    const product = payload.product.toLowerCase()
    const origin = payload.origin.toUpperCase()
    const territory = payload.territory.toUpperCase() as Territory

    // Déterminer si le pays d'origine fait partie de l'UE
    const isEU = isEUCountry(origin)
    const originID = isEU ? 1 : 2 // 1 pour EU, 2 pour HORS_EU

    try {
      const result = await db
        .select({
          tva: taxes.tva,
          om: taxes.om,
          omr: taxes.omr,
        })
        .from(products)
        .innerJoin(categories, eq(products.categoryID, categories.categoryID))
        .innerJoin(taxes, eq(categories.taxID, taxes.taxID))
        .where(
          and(
            eq(products.productName, product),
            eq(products.originID, originID),
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
