import logger from "@adonisjs/core/services/logger"
import redis from "@adonisjs/redis/services/main"
import type { ProductTaxesSimulatorResult } from "@taxdom/types"
import { and, eq } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"

import type * as schema from "#database/schema"
import { categories, origins, products, taxes, territories } from "#database/schema"
import { NotFoundError } from "#exceptions/ServiceErrors"

type DB = NodePgDatabase<typeof schema>

const CACHE_TTL_SECONDS = 3600

export type ProductTaxesInput = {
  product: string
  origin: string
  territory: string
}

export class GetProductTaxesService {
  constructor(private db: DB) {}

  async getTaxesForProduct(input: ProductTaxesInput): Promise<ProductTaxesSimulatorResult> {
    const productName = input.product
    const originName = input.origin.toUpperCase()
    const territoryName = input.territory.toUpperCase()

    const cacheKey = `product_taxes:${productName}:${originName}:${territoryName}`

    let cached: string | null = null
    try {
      cached = await redis.get(cacheKey)
    } catch (err) {
      logger.warn("Redis read failed, proceeding without cache: %O", err)
    }
    if (cached) {
      return JSON.parse(cached) as ProductTaxesSimulatorResult
    }

    const [row] = await this.db
      .select({
        tva: taxes.tva,
        om: taxes.om,
        omr: taxes.omr,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryID, categories.categoryID))
      .innerJoin(taxes, eq(categories.taxID, taxes.taxID))
      .innerJoin(origins, eq(products.originID, origins.originID))
      .innerJoin(territories, eq(products.territoryID, territories.territoryID))
      .where(
        and(
          eq(products.productName, productName),
          eq(origins.originName, originName),
          eq(origins.available, true),
          eq(territories.territoryName, territoryName),
          eq(territories.available, true),
          eq(products.available, true),
        ),
      )
      .limit(1)

    if (!row) {
      logger.warn(
        "[PRODUCT TAX MISS] product=%s origin=%s territory=%s",
        productName,
        originName,
        territoryName,
      )

      const [originRow, territoryRow] = await Promise.all([
        this.db.query.origins.findFirst({
          where: and(eq(origins.originName, originName), eq(origins.available, true)),
          columns: { originID: true },
        }),
        this.db.query.territories.findFirst({
          where: and(eq(territories.territoryName, territoryName), eq(territories.available, true)),
          columns: { territoryID: true },
        }),
      ])

      if (!originRow) {
        throw new NotFoundError("Origin not found")
      }
      if (!territoryRow) {
        throw new NotFoundError("Territory not found")
      }

      throw new NotFoundError(`No tax found for product "${productName}"`)
    }

    logger.info(
      "Resolved taxes for product=%s origin=%s territory=%s",
      productName,
      originName,
      territoryName,
    )

    const result: ProductTaxesSimulatorResult = {
      product: productName,
      taxes: {
        tva: Number(row.tva),
        om: Number(row.om),
        omr: Number(row.omr),
      },
    }

    try {
      await redis.setex(cacheKey, CACHE_TTL_SECONDS, JSON.stringify(result))
    } catch (err) {
      logger.warn("Failed to cache product taxes: %O", err)
    }

    return result
  }
}
