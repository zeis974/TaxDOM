import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { ilike } from "drizzle-orm"
import { db } from "#config/database"
import { products } from "#database/schema"
import { BadRequestError, NotFoundError } from "#exceptions/ServiceErrors"
import { SearchProductsValidator } from "#validators/SearchProductsValidator"

export default class SearchProductsController {
  async handle({ request }: HttpContext) {
    const filters = await request.validateUsing(SearchProductsValidator)
    const productName = filters.name.trim()

    if (!productName) {
      throw new BadRequestError("Product name is required")
    }

    const result = await db
      .selectDistinct({ name: products.productName })
      .from(products)
      .where(ilike(products.productName, `${productName}%`))
      .orderBy(products.productName)
      .limit(10)

    if (!result.length) {
      throw new NotFoundError("No product found")
    }

    logger.info("Fetching (%s) productName in searchProductNameController", productName)

    return result.map((row) => ({ name: row.name }))
  }
}
