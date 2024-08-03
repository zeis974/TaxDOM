import type { HttpContext } from "@adonisjs/core/http"
import { and, eq } from "drizzle-orm"
import { db } from "#config/database"
import { ProductsTables, Taxes } from "#database/schema"

import type { Origin, TaxSimulatorFormLabel, Territory } from "#types/index"

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
    // biome-ignore lint/suspicious/noExplicitAny: any
    const body: Record<TaxSimulatorFormLabel, any> = request.body()

    const product: string = body.product.toLowerCase()
    const origin: Origin = body.origin.toUpperCase()
    const territory: Territory = body.territory.toUpperCase()

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

    return result
  }
}
