import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import type { Product } from "@taxdom/types"
import { count, eq } from "drizzle-orm"
import { v7 as uuidv7 } from "uuid"

import { db } from "#config/database"
import {
  categories,
  flux,
  origins,
  products,
  taxes,
  templateProducts,
  territories,
} from "#database/schema"
import { CreateProductValidator, UpdateProductValidator } from "#validators/CreateProductValidator"

const productRelations = {
  category: {
    columns: { categoryID: true, categoryName: true },
  },
  origin: {
    columns: { originID: true, originName: true, isEU: true },
  },
  territory: {
    columns: { territoryID: true, territoryName: true },
  },
  flux: {
    columns: { fluxID: true, fluxName: true },
  },
  tax: {
    columns: { taxID: true, tva: true, om: true, omr: true },
  },
} as const

function mapProduct(product: {
  productID: string
  productName: string
  category: { categoryID: string; categoryName: string }
  origin: { originID: string; originName: string; isEU: boolean }
  territory: { territoryID: string; territoryName: string }
  flux: { fluxID: string; fluxName: string }
  tax: { taxID: string; tva: number; om: number; omr: number }
  createdAt: Date | null
  updatedAt: Date | null
}): Product {
  return {
    productID: product.productID,
    productName: product.productName,
    category: {
      categoryID: product.category.categoryID,
      categoryName: product.category.categoryName,
    },
    origin: {
      originID: product.origin.originID,
      originName: product.origin.originName,
      isEU: product.origin.isEU,
    },
    territory: {
      territoryID: product.territory.territoryID,
      territoryName: product.territory.territoryName,
    },
    flux: {
      fluxID: product.flux.fluxID,
      fluxName: product.flux.fluxName,
    },
    tax: {
      taxID: product.tax.taxID,
      tva: product.tax.tva,
      om: product.tax.om,
      omr: product.tax.omr,
    },
    createdAt: product.createdAt ?? new Date(),
    updatedAt: product.updatedAt ?? new Date(),
  }
}

export default class ProductsController {
  /**
   * Get products count
   */
  async count() {
    try {
      const total = await db.select({ count: count() }).from(products)
      return { products_count: total[0].count }
    } catch (err) {
      logger.error({ err }, "Cannot get products count")
    }
  }

  /**
   * Get recent products
   */
  async recent() {
    try {
      const recentProducts = await db.query.products.findMany({
        orderBy: (products, { desc }) => [desc(products.createdAt)],
        limit: 5,
        with: {
          category: { columns: { categoryName: true } },
        },
      })
      return {
        recent_products: recentProducts.map((p) => ({
          productID: p.productID,
          productName: p.productName,
          categoryName: p.category.categoryName,
          createdAt: p.createdAt,
        })),
      }
    } catch (err) {
      logger.error({ err }, "Cannot get recent products")
      return { recent_products: [] }
    }
  }

  /**
   * Get products distribution by category
   */
  async distribution() {
    try {
      const dist = await db
        .select({
          categoryID: categories.categoryID,
          categoryName: categories.categoryName,
          count: count(),
        })
        .from(products)
        .innerJoin(categories, eq(products.categoryID, categories.categoryID))
        .groupBy(categories.categoryID, categories.categoryName)

      return { distribution: dist }
    } catch (err) {
      logger.error({ err }, "Cannot get products distribution")
      return { distribution: [] }
    }
  }

  /**
   * List all flux
   */
  async listFlux() {
    try {
      const allFlux = await db.query.flux.findMany({
        orderBy: (flux, { asc }) => [asc(flux.fluxName)],
      })
      return allFlux
    } catch (err) {
      logger.error({ err }, "Cannot get flux list")
      return []
    }
  }

  /**
   * List all taxes
   */
  async listTaxes() {
    try {
      const allTaxes = await db.query.taxes.findMany()
      return allTaxes
    } catch (err) {
      logger.error({ err }, "Cannot get taxes list")
      return []
    }
  }

  /**
   * Get all products
   */
  async index() {
    try {
      const productsData = await db.query.products.findMany({
        with: productRelations,
      })

      const allProducts: Product[] = productsData.map(mapProduct)

      logger.info("Fetched all products successfully")
      return allProducts
    } catch (err) {
      logger.error({ err }, "Cannot get products")
    }
  }

  /**
   * Create a new product
   */
  async store({ request, response }: HttpContext) {
    try {
      const validatedData = await CreateProductValidator.validate(request.all())
      const { productName, categoryID, originID, territoryID, fluxID, taxID } = validatedData

      // Verify all FK entities exist
      const [existingCategory, existingOrigin, existingTerritory, existingFlux, existingTax] =
        await Promise.all([
          db.query.categories.findFirst({ where: eq(categories.categoryID, categoryID) }),
          db.query.origins.findFirst({ where: eq(origins.originID, originID) }),
          db.query.territories.findFirst({ where: eq(territories.territoryID, territoryID) }),
          db.query.flux.findFirst({ where: eq(flux.fluxID, fluxID) }),
          db.query.taxes.findFirst({ where: eq(taxes.taxID, taxID) }),
        ])

      if (!existingCategory) {
        return response.badRequest({ error: "La catégorie spécifiée n'existe pas" })
      }
      if (!existingOrigin) {
        return response.badRequest({ error: "L'origine spécifiée n'existe pas" })
      }
      if (!existingTerritory) {
        return response.badRequest({ error: "Le territoire spécifié n'existe pas" })
      }
      if (!existingFlux) {
        return response.badRequest({ error: "Le flux spécifié n'existe pas" })
      }
      if (!existingTax) {
        return response.badRequest({ error: "La taxe spécifiée n'existe pas" })
      }

      // Check for duplicate product name
      const existingProduct = await db.query.products.findFirst({
        where: eq(products.productName, productName.trim()),
      })

      if (existingProduct) {
        return response.badRequest({ error: "Un produit avec ce nom existe déjà" })
      }

      const productID = uuidv7()

      await db.insert(products).values({
        productID,
        productName: productName.trim(),
        categoryID,
        originID,
        territoryID,
        fluxID,
        taxID,
      })

      const createdProduct = await db.query.products.findFirst({
        where: eq(products.productID, productID),
        with: productRelations,
      })

      if (!createdProduct) {
        return response.badRequest({ error: "Erreur lors de la récupération du produit créé" })
      }

      logger.info(`Created product ${productID} successfully`)
      return response.created(mapProduct(createdProduct))
    } catch (err) {
      logger.error({ err }, "Cannot create product")
    }
  }

  /**
   * Get a specific product by ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const productId: string = params.id

      if (!productId || typeof productId !== "string") {
        return response.badRequest({ error: "ID de produit invalide" })
      }

      const productData = await db.query.products.findFirst({
        where: eq(products.productID, productId),
        with: productRelations,
      })

      if (!productData) {
        return response.notFound({ error: "Produit non trouvé" })
      }

      logger.info(`Fetched product ${productId} successfully`)
      return mapProduct(productData)
    } catch (err) {
      logger.error({ err }, "Cannot get product")
    }
  }

  /**
   * Update a specific product by ID
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const productId: string = params.id

      if (!productId) {
        return response.badRequest({ error: "ID de produit invalide" })
      }

      const existingProduct = await db.query.products.findFirst({
        where: eq(products.productID, productId),
      })

      if (!existingProduct) {
        return response.notFound({ error: "Produit non trouvé" })
      }

      const validatedData = await UpdateProductValidator.validate(request.all())
      const { productName, categoryID, originID, territoryID, fluxID, taxID } = validatedData

      // Check for duplicate product name (excluding current product)
      const duplicateProduct = await db.query.products.findFirst({
        where: (products, { eq, and, ne }) =>
          and(eq(products.productName, productName.trim()), ne(products.productID, productId)),
      })

      if (duplicateProduct) {
        return response.badRequest({ error: "Un produit avec ce nom existe déjà" })
      }

      // Verify all FK entities exist
      const [existingCategory, existingOrigin, existingTerritory, existingFlux, existingTax] =
        await Promise.all([
          db.query.categories.findFirst({ where: eq(categories.categoryID, categoryID) }),
          db.query.origins.findFirst({ where: eq(origins.originID, originID) }),
          db.query.territories.findFirst({ where: eq(territories.territoryID, territoryID) }),
          db.query.flux.findFirst({ where: eq(flux.fluxID, fluxID) }),
          db.query.taxes.findFirst({ where: eq(taxes.taxID, taxID) }),
        ])

      if (!existingCategory) {
        return response.badRequest({ error: "La catégorie spécifiée n'existe pas" })
      }
      if (!existingOrigin) {
        return response.badRequest({ error: "L'origine spécifiée n'existe pas" })
      }
      if (!existingTerritory) {
        return response.badRequest({ error: "Le territoire spécifié n'existe pas" })
      }
      if (!existingFlux) {
        return response.badRequest({ error: "Le flux spécifié n'existe pas" })
      }
      if (!existingTax) {
        return response.badRequest({ error: "La taxe spécifiée n'existe pas" })
      }

      await db
        .update(products)
        .set({
          productName: productName.trim(),
          categoryID,
          originID,
          territoryID,
          fluxID,
          taxID,
        })
        .where(eq(products.productID, productId))

      const updatedProduct = await db.query.products.findFirst({
        where: eq(products.productID, productId),
        with: productRelations,
      })

      if (!updatedProduct) {
        return response.internalServerError({
          error: "Erreur lors de la récupération du produit mis à jour",
        })
      }

      logger.info(`Updated product ${productId} successfully`)
      return mapProduct(updatedProduct)
    } catch (err) {
      logger.error({ err }, "Cannot update product")
    }
  }

  /**
   * Delete a specific product by ID
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const productId: string = params.id

      if (!productId) {
        return response.badRequest({ error: "ID de produit invalide" })
      }

      const existingProduct = await db.query.products.findFirst({
        where: eq(products.productID, productId),
      })

      if (!existingProduct) {
        return response.notFound({ error: "Produit non trouvé" })
      }

      // Check for related template_products
      const relatedTemplates = await db
        .select({ count: count() })
        .from(templateProducts)
        .where(eq(templateProducts.productID, productId))

      if (relatedTemplates[0]?.count > 0) {
        return response.badRequest({
          error: `Impossible de supprimer ce produit car il est lié à ${relatedTemplates[0].count} template(s). Veuillez d'abord retirer ce produit des templates.`,
        })
      }

      await db.delete(products).where(eq(products.productID, productId))

      logger.info(`Deleted product ${productId} successfully`)
      return response.ok({ message: "Produit supprimé avec succès" })
    } catch (err) {
      logger.error({ err }, "Cannot delete product")
    }
  }
}
