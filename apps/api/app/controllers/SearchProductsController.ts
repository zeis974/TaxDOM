import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { sql } from "drizzle-orm"
import { db } from "#config/database"
import { SearchProductsValidator } from "#validators/SearchProductsValidator"

export default class SearchProductsController {
  async handle({ request }: HttpContext) {
    const filters = await SearchProductsValidator.validate(request.qs())
    const productName = filters.name

    if (!productName) {
      return { error: "Product name is required" }
    }

    const result = await db.run(sql`
      SELECT DISTINCT p.product_name
      FROM products p
      JOIN products_fts fts ON p.product_id = fts.rowid
      WHERE products_fts MATCH ${`${productName}*`}
      ORDER BY rank
      LIMIT 10;
    `)

    if (!result.rows.length) {
      return { error: "No product found" }
    }

    logger.info("Fetching (%s) productName in searchProductNameController", productName)

    return result.rows.map((row) => ({ name: row.product_name as string }))
  }
}
