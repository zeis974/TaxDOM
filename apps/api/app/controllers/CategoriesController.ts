import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import type { Category } from "@taxdom/types"
import { count, eq } from "drizzle-orm"

import { db } from "#config/database"
import { categories, products, taxes } from "#database/schema"
import { CreateCategoryValidator, UpdateCategoryValidator } from "#validators/CategoryValidator"

export default class CategoriesController {
  /**
   * Get all categories
   * This method retrieves all categories from the database,
   * including their associated tax information and related products.
   */
  async index() {
    try {
      const categoriesData = await db.query.categories.findMany({
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

      const allCategories: Category[] = categoriesData.map((category) => ({
        uuid: category.uuid,
        name: category.categoryName,
        taxID: category.taxID ?? undefined,
        taxes: category.tax ?? undefined,
        relatedProducts: category.products?.length ?? 0,
      }))

      logger.info("Fetched all categories successfully")

      return allCategories
    } catch (err) {
      logger.error({ err: err }, "Cannot get categories")
      console.error("Cannot get categories", err)
    }
  }

  /**
   * Create a new category
   * This method checks if the category name is provided and unique.
   * It also checks if the tax values are valid numbers and positive.
   * If the tax does not exist, it creates a new tax entry.
   */
  async store({ request, response }: HttpContext) {
    try {
      const validatedData = await CreateCategoryValidator.validate(request.all())
      const { categoryName, tva, om, omr } = validatedData

      const existingCategory = await db.query.categories.findFirst({
        where: eq(categories.categoryName, categoryName.trim()),
      })

      if (existingCategory) {
        return response.badRequest({
          error: "A category with this name already exists",
        })
      }

      const existingTax = await db.query.taxes.findFirst({
        where: (taxes, { eq, and }) =>
          and(eq(taxes.tva, tva), eq(taxes.om, om), eq(taxes.omr, omr)),
      })

      let taxID: number

      if (existingTax) {
        taxID = existingTax.taxID
        logger.info(`Using existing tax ${taxID} with values: TVA ${tva}%, OM ${om}%, OMR ${omr}%`)
      } else {
        const newTax = await db
          .insert(taxes)
          .values({
            tva: tva,
            om: om,
            omr: omr,
          })
          .returning()

        taxID = newTax[0].taxID
        logger.info(`Created new tax ${taxID} with values: TVA ${tva}%, OM ${om}%, OMR ${omr}%`)
      }

      const newCategory = await db
        .insert(categories)
        .values({
          uuid: crypto.randomUUID(),
          categoryName: categoryName.trim(),
          taxID: taxID,
        })
        .returning()

      const createdCategoryData = await db.query.categories.findFirst({
        where: eq(categories.categoryID, newCategory[0].categoryID),
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

      if (!createdCategoryData) {
        return response.badRequest({
          error: "Error retrieving the created category",
        })
      }

      const createdCategory: Category = {
        uuid: createdCategoryData.uuid,
        name: createdCategoryData.categoryName,
        taxID: createdCategoryData.taxID ?? undefined,
        taxes: createdCategoryData.tax ?? undefined,
        relatedProducts: createdCategoryData.products?.length ?? 0,
      }

      logger.info(`Created category ${createdCategory.uuid} successfully`)
      return response.created(createdCategory)
    } catch (err) {
      logger.error({ err: err }, "Cannot create category")
      console.error("Cannot create category", err)
    }
  }

  /**
   * Get a specific category by ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const categoryUuid = params.uuid

      if (!categoryUuid || typeof categoryUuid !== "string") {
        return response.badRequest({
          error: "Invalid category UUID",
        })
      }

      const categoryData = await db.query.categories.findFirst({
        where: eq(categories.uuid, categoryUuid),
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
          error: "Category not found",
        })
      }

      const category: Category = {
        uuid: categoryData.uuid,
        name: categoryData.categoryName,
        taxID: categoryData.taxID ?? undefined,
        taxes: categoryData.tax ?? undefined,
        relatedProducts: categoryData.products?.length ?? 0,
      }

      logger.info(`Fetched category ${categoryUuid} successfully`)
      return category
    } catch (err) {
      logger.error({ err: err }, "Cannot get category")
      console.error("Cannot get category", err)
    }
  }

  /**
   * Update a specific category by ID
   * This method allows updating the category name and tax ID.
   * It checks if the category exists and if the new name is unique.
   * If the tax ID is provided, it checks if the tax exists before updating.
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const categoryId = Number(params.id)

      if (!categoryId || Number.isNaN(categoryId)) {
        return response.badRequest({
          error: "Invalid category ID",
        })
      }

      const existingCategory = await db.query.categories.findFirst({
        where: eq(categories.categoryID, categoryId),
      })

      if (!existingCategory) {
        return response.notFound({
          error: "Category not found",
        })
      }

      const validatedData = await UpdateCategoryValidator.validate(request.all())
      const { categoryName, taxID } = validatedData

      const duplicateCategory = await db.query.categories.findFirst({
        where: (categories, { eq, and, ne }) =>
          and(eq(categories.categoryName, categoryName), ne(categories.categoryID, categoryId)),
      })

      if (duplicateCategory) {
        return response.badRequest({
          error: "A category with this name already exists",
        })
      }

      const updateData: Partial<typeof categories.$inferInsert> = {
        categoryName: categoryName.trim(),
      }

      if (taxID !== undefined) {
        const taxExists = await db.query.taxes.findFirst({
          where: (taxes, { eq }) => eq(taxes.taxID, taxID),
        })

        if (!taxExists) {
          return response.badRequest({
            error: "The specified tax does not exist",
          })
        }

        updateData.taxID = taxID
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

      if (!updatedCategoryData) {
        return response.internalServerError({
          error: "Error retrieving the updated category",
        })
      }

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
   * Delete a specific category by ID
   * This method checks if the category is linked to any products before deletion.
   * If it is linked, it returns an error message indicating the number of products linked to the category.
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const categoryId = Number(params.id)

      if (!categoryId || Number.isNaN(categoryId)) {
        return response.badRequest({
          error: "Invalid category ID",
        })
      }

      const existingCategory = await db.query.categories.findFirst({
        where: eq(categories.categoryID, categoryId),
      })

      if (!existingCategory) {
        return response.badRequest({
          error: "Category not found",
        })
      }

      const relatedProductsCount = await db
        .select({ count: count() })
        .from(products)
        .where(eq(products.categoryID, categoryId))

      if (relatedProductsCount[0]?.count > 0) {
        return response.badRequest({
          error: `Cannot delete this category because it is linked to ${relatedProductsCount[0].count} product(s). Please delete or reassign these products first.`,
        })
      }

      await db.delete(categories).where(eq(categories.categoryID, categoryId))

      logger.info(`Deleted category ${categoryId} successfully`)
      return response.ok({
        message: "Category deleted successfully",
      })
    } catch (err) {
      logger.error({ err: err }, "Cannot delete category")
      console.error("Cannot delete category", err)
    }
  }
}
