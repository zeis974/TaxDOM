import type { HttpContext } from "@adonisjs/core/http"
import { db } from "#config/database"
import { sql } from "drizzle-orm"

export default class SearchProductNameController {
  async handle({ request }: HttpContext) {
    const productName = request.qs().name

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

    return result.rows.map((row) => ({ name: row.product_name as string }))
  }
}
