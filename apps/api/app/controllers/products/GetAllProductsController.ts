import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import type { Origin, Product, Territory } from "@taxdom/types"
import { count } from "drizzle-orm"

import { db } from "#config/database"
import { products } from "#database/schema"

export default class GetAllProductsController {
  async handle({ request }: HttpContext) {
    try {
      const productsData = await db.query.products.findMany({
        with: {
          category: {
            columns: {
              categoryID: true,
              categoryName: true,
            },
          },
          origin: {
            columns: {
              originID: true,
              originName: true,
            },
          },
          territory: {
            columns: {
              territoryID: true,
              territoryName: true,
            },
          },
          flux: {
            columns: {
              fluxID: true,
              fluxName: true,
            },
          },
          tax: {
            columns: {
              taxID: true,
              tva: true,
              om: true,
              omr: true,
            },
          },
        },
      })

      const allProducts: Product[] = productsData.map((product) => ({
        name: product.productName,
        category: product.category.categoryName,
        origin: product.origin.originName as Origin,
        territory: product.territory.territoryName as Territory,
        flux: product.flux.fluxName,
        tax: product.tax,
        createdAt: product.createdAt ?? undefined,
        updatedAt: product.updatedAt ?? undefined,
      }))

      logger.info("Fetched all products successfully")

      return allProducts
    } catch (err) {
      logger.error({ err: err }, "Cannot get products")
    }
  }
}
