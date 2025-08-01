import type { Category, Origin, Product, Territory } from "@taxdom/types"
import type { HttpContext } from "@adonisjs/core/http"

import { eq, count } from "drizzle-orm"
import { db } from "#config/database"
import { categories, products } from "#database/schema"
import logger from "@adonisjs/core/services/logger"

export default class ProductsController {
  /**
   * Get all producs
   */
  async index() {
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
      console.error("Cannot get products", err)
      logger.error({ err: err }, "Cannot get products")
    }
  }

  /**
   * Display a single post by id.
   */
  async show({ params, response }: HttpContext) {
    try {
      const categoryId = Number(params.id)

      if (!categoryId || Number.isNaN(categoryId)) {
        return response.badRequest({
          error: "ID de catégorie invalide",
        })
      }

      const categoryData = await db.query.categories.findFirst({
        where: eq(categories.categoryID, categoryId),
        with: {
          tax: {
            columns: {
              tva: true,
              om: true,
              omr: true,
            },
          },
          products: true,
        },
      })

      if (!categoryData) {
        return response.notFound({
          error: "Catégorie non trouvée",
        })
      }

      const category: Category = {
        uuid: categoryData.uuid,
        name: categoryData.categoryName,
        taxID: categoryData.taxID ?? undefined,
        taxes: categoryData.tax ?? undefined,
        relatedProducts: categoryData.products?.length ?? 0,
      }

      logger.info(`Fetched category ${categoryId} successfully`)
      return category
    } catch (err) {
      logger.error({ err: err }, "Cannot get category")
      console.error("Cannot get category", err)
    }
  }

  /**
   * Handle the form submission to update a specific post by id
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const categoryId = Number(params.id)

      if (!categoryId || Number.isNaN(categoryId)) {
        return response.badRequest({
          error: "ID de catégorie invalide",
        })
      }

      const existingCategory = await db.query.categories.findFirst({
        where: eq(categories.categoryID, categoryId),
      })

      if (!existingCategory) {
        return response.notFound({
          error: "Catégorie non trouvée",
        })
      }

      const { categoryName, taxID } = request.only(["categoryName", "taxID"])

      if (!categoryName || typeof categoryName !== "string") {
        return response.badRequest({
          error: "Le nom de la catégorie est requis et doit être une chaîne de caractères",
        })
      }

      const duplicateCategory = await db.query.categories.findFirst({
        where: (categories, { eq, and, ne }) =>
          and(eq(categories.categoryName, categoryName), ne(categories.categoryID, categoryId)),
      })

      if (duplicateCategory) {
        return response.badRequest({
          error: "Une catégorie avec ce nom existe déjà",
        })
      }

      const updateData: Partial<typeof categories.$inferInsert> = {
        categoryName: categoryName.trim(),
      }

      if (taxID !== undefined) {
        const taxIdNumber = Number(taxID)
        if (Number.isNaN(taxIdNumber)) {
          return response.badRequest({
            error: "L'ID de taxe doit être un nombre",
          })
        }

        const taxExists = await db.query.taxes.findFirst({
          where: (taxes, { eq }) => eq(taxes.taxID, taxIdNumber),
        })

        if (!taxExists) {
          return response.badRequest({
            error: "La taxe spécifiée n'existe pas",
          })
        }

        updateData.taxID = taxIdNumber
      }

      await db.update(categories).set(updateData).where(eq(categories.categoryID, categoryId))

      const updatedCategoryData = await db.query.categories.findFirst({
        where: eq(categories.categoryID, categoryId),
        with: {
          tax: {
            columns: {
              tva: true,
              om: true,
              omr: true,
            },
          },
          products: true,
        },
      })

      if (!updatedCategoryData) return

      const updatedCategory: Category = {
        uuid: updatedCategoryData.uuid,
        name: updatedCategoryData.categoryName,
        taxID: updatedCategoryData.taxID ?? undefined,
        taxes: updatedCategoryData.tax ?? undefined,
        relatedProducts: updatedCategoryData.products?.length ?? 0,
      }

      logger.info(`Updated category ${categoryId} successfully`)
      return updatedCategory
    } catch (err) {
      logger.error({ err: err }, "Cannot update category")
      console.error("Cannot update category", err)
    }
  }

  /**
   * Handle the form submission to delete a specific post by id.
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const categoryId = Number(params.id)

      if (!categoryId || Number.isNaN(categoryId)) {
        return response.badRequest({
          error: "ID de catégorie invalide",
        })
      }

      // Vérifier que la catégorie existe
      const existingCategory = await db.query.categories.findFirst({
        where: eq(categories.categoryID, categoryId),
      })

      if (!existingCategory) {
        return response.notFound({
          error: "Catégorie non trouvée",
        })
      }

      const relatedProductsCount = await db
        .select({ count: count() })
        .from(products)
        .where(eq(products.categoryID, categoryId))

      if (relatedProductsCount[0]?.count > 0) {
        return response.badRequest({
          error: `Impossible de supprimer cette catégorie car elle est liée à ${relatedProductsCount[0].count} produit(s). Veuillez d'abord supprimer ou réassigner ces produits.`,
        })
      }

      await db.delete(categories).where(eq(categories.categoryID, categoryId))

      logger.info(`Deleted category ${categoryId} successfully`)
      return response.ok({
        message: "Catégorie supprimée avec succès",
      })
    } catch (err) {
      logger.error({ err: err }, "Cannot delete category")
      console.error("Cannot delete category", err)
    }
  }
}
