import type { Category } from "@taxdom/types"
import { and, count, eq, type InferSelectModel, ne } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { v7 as uuidv7 } from "uuid"

import type * as schema from "#database/schema"
import { categories, products, taxes } from "#database/schema"
import { BadRequestError, ConflictError, NotFoundError } from "#exceptions/ServiceErrors"

type DB = NodePgDatabase<typeof schema>

export type CategoryCountResult = {
  categories_count: number
}

export type CategoryWithStatsResult = {
  categoryID: string
  categoryName: string
  tax?: { tva: number; om: number; omr: number }
  relatedProducts: number
}

export type CreateCategoryInput = {
  categoryName: string
  tva: number
  om: number
  omr: number
}

export type UpdateCategoryInput = {
  categoryName: string
  taxID?: string
}

function mapCategory(
  row: InferSelectModel<typeof categories> & {
    tax?: { tva: string; om: string; omr: string } | null
    products?: unknown[]
  },
): Category {
  return {
    categoryID: row.categoryID,
    categoryName: row.categoryName,
    taxID: row.taxID ?? "",
    tax: row.tax
      ? {
          tva: Number(row.tax.tva),
          om: Number(row.tax.om),
          omr: Number(row.tax.omr),
        }
      : undefined,
    relatedProducts: row.products?.length ?? 0,
  }
}

export class CategoryService {
  constructor(private db: DB) {}

  /**
   * Returns the total number of categories in the database.
   */
  async count(): Promise<CategoryCountResult> {
    const total = await this.db.select({ count: count() }).from(categories)
    return { categories_count: total[0].count }
  }

  /**
   * Fetches all categories with their associated tax stats and product counts.
   */
  async findAllWithStats(): Promise<CategoryWithStatsResult[]> {
    const categoriesData = await this.db.query.categories.findMany({
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

    return categoriesData.map((category) => ({
      categoryID: category.categoryID,
      categoryName: category.categoryName,
      tax: category.tax
        ? {
            tva: Number(category.tax.tva),
            om: Number(category.tax.om),
            omr: Number(category.tax.omr),
          }
        : undefined,
      relatedProducts: category.products?.length ?? 0,
    }))
  }

  /**
   * Fetches all categories with their tax information and product counts.
   */
  async findAll(): Promise<Category[]> {
    const categoriesData = await this.db.query.categories.findMany({
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

    return categoriesData.map(mapCategory)
  }

  /**
   * Finds a single category by its ID with relations.
   * @throws NotFoundError if the category does not exist.
   */
  async findById(categoryId: string): Promise<Category> {
    const categoryData = await this.db.query.categories.findFirst({
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
      throw new NotFoundError("Category not found")
    }

    return mapCategory(categoryData)
  }

  /**
   * Creates a new category with get-or-create tax logic.
   * @throws ConflictError if a category with the same name already exists.
   */
  async create(input: CreateCategoryInput): Promise<Category> {
    const trimmedName = input.categoryName.trim()

    return await this.db.transaction(async (tx) => {
      const existingCategory = await tx.query.categories.findFirst({
        where: eq(categories.categoryName, trimmedName),
      })

      if (existingCategory) {
        throw new ConflictError("A category with this name already exists")
      }

      const existingTax = await tx.query.taxes.findFirst({
        where: (taxes, { eq, and }) =>
          and(
            eq(taxes.tva, String(input.tva)),
            eq(taxes.om, String(input.om)),
            eq(taxes.omr, String(input.omr)),
          ),
      })

      let taxID: string

      if (existingTax) {
        taxID = existingTax.taxID
      } else {
        const newTaxID = uuidv7()
        const newTax = await tx
          .insert(taxes)
          .values({
            taxID: newTaxID,
            tva: String(input.tva),
            om: String(input.om),
            omr: String(input.omr),
          })
          .returning()

        taxID = newTax[0].taxID
      }

      const categoryID = uuidv7()

      const newCategory = await tx
        .insert(categories)
        .values({
          categoryID,
          categoryName: trimmedName,
          taxID,
        })
        .returning()

      const createdCategoryData = await tx.query.categories.findFirst({
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
        throw new NotFoundError("Error retrieving the created category")
      }

      return mapCategory(createdCategoryData)
    })
  }

  /**
   * Updates an existing category.
   * @throws NotFoundError if the category does not exist.
   * @throws ConflictError if another category already uses the same name.
   * @throws BadRequestError if the specified tax does not exist.
   */
  async update(categoryId: string, input: UpdateCategoryInput): Promise<Category> {
    return await this.db.transaction(async (tx) => {
      const existingCategory = await tx.query.categories.findFirst({
        where: eq(categories.categoryID, categoryId),
      })

      if (!existingCategory) {
        throw new NotFoundError("Category not found")
      }

      const duplicateCategory = await tx.query.categories.findFirst({
        where: and(
          eq(categories.categoryName, input.categoryName),
          ne(categories.categoryID, categoryId),
        ),
      })

      if (duplicateCategory) {
        throw new ConflictError("A category with this name already exists")
      }

      const updateData: Partial<typeof categories.$inferInsert> = {
        categoryName: input.categoryName.trim(),
      }

      if (input.taxID !== undefined) {
        const taxExists = await tx.query.taxes.findFirst({
          where: eq(taxes.taxID, input.taxID),
        })

        if (!taxExists) {
          throw new BadRequestError("The specified tax does not exist")
        }

        updateData.taxID = input.taxID
      }

      await tx.update(categories).set(updateData).where(eq(categories.categoryID, categoryId))

      const updatedCategoryData = await tx.query.categories.findFirst({
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
        throw new NotFoundError("Error retrieving the updated category")
      }

      return mapCategory(updatedCategoryData)
    })
  }

  /**
   * Deletes a category by ID if it is not linked to any products.
   * @throws NotFoundError if the category does not exist.
   * @throws BadRequestError if the category is linked to products.
   */
  async delete(categoryId: string): Promise<void> {
    await this.db.transaction(async (tx) => {
      const existingCategory = await tx.query.categories.findFirst({
        where: eq(categories.categoryID, categoryId),
      })

      if (!existingCategory) {
        throw new NotFoundError("Category not found")
      }

      const relatedProductsCount = await tx
        .select({ count: count() })
        .from(products)
        .where(eq(products.categoryID, categoryId))

      if (relatedProductsCount[0]?.count > 0) {
        throw new BadRequestError(
          `Cannot delete this category because it is linked to ${relatedProductsCount[0].count} product(s). Please delete or reassign these products first.`,
        )
      }

      await tx.delete(categories).where(eq(categories.categoryID, categoryId))
    })
  }
}
