import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"

import { db } from "#config/database"
import { GetProductTaxesService } from "#services/GetProductTaxesService"
import { GetProductTaxeValidator } from "#validators/GetProductTaxeValidator"

export default class GetProductTaxeController {
  async handle({ request }: HttpContext) {
    const payload = await request.validateUsing(GetProductTaxeValidator)

    const service = new GetProductTaxesService(db)

    const result = await service.getTaxesForProduct({
      product: payload.product,
      origin: payload.origin,
      territory: payload.territory,
    })

    logger.info("Fetching (%s) taxes in getProductTaxeController", result.product)

    return result
  }
}
