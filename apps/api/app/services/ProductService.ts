import type { Product } from "@taxdom/types"
import { count, eq, type InferSelectModel } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import { v7 as uuidv7 } from "uuid"

import type * as schema from "#database/schema"
import { categories, origins, products, templateProducts, territories } from "#database/schema"
import { BadRequestError, ConflictError, NotFoundError } from "#exceptions/ServiceErrors"

type DB = NodePgDatabase<typeof schema>

const productRelations = {
  category: {
    columns: { categoryID: true, categoryName: true },
    with: {
      tax: { columns: { taxID: true, tva: true, om: true, omr: true } },
    },
  },
  origin: {
    columns: { originID: true, originName: true, isEU: true },
  },
  territory: {
    columns: { territoryID: true, territoryName: true },
  },
} as const

type ProductQueryResult = InferSelectModel<typeof products> & {
  category: Pick<InferSelectModel<typeof categories>, "categoryID" | "categoryName"> & {
    tax: { taxID: string; tva: string; om: string; omr: string }
  }
  origin: Pick<InferSelectModel<typeof origins>, "originID" | "originName" | "isEU">
  territory: Pick<InferSelectModel<typeof territories>, "territoryID" | "territoryName">
}

function toDecimalNumber(value: unknown): number {
  const num = Number(value)
  if (Number.isNaN(num)) {
    throw new Error(`Invalid decimal value: ${String(value)}`)
  }
  return num
}

function mapProduct(row: ProductQueryResult): Product {
  return {
    productID: row.productID,
    productName: row.productName,
    category: {
      categoryID: row.category.categoryID,
      categoryName: row.category.categoryName,
    },
    origin: {
      originID: row.origin.originID,
      originName: row.origin.originName,
      isEU: row.origin.isEU,
    },
    territory: {
      territoryID: row.territory.territoryID,
      territoryName: row.territory.territoryName,
    },
    tax: {
      taxID: row.category.tax.taxID,
      tva: toDecimalNumber(row.category.tax.tva),
      om: toDecimalNumber(row.category.tax.om),
      omr: toDecimalNumber(row.category.tax.omr),
    },
    createdAt: row.createdAt ?? new Date(),
    updatedAt: row.updatedAt ?? new Date(),
  }
}

export type CreateProductInput = {
  productName: string
  categoryID: string
  originID: string
  territoryID: string
}

export type UpdateProductInput = CreateProductInput

export type ProductCountResult = {
  products_count: number
}

export type RecentProductResult = {
  productID: string
  productName: string
  categoryName: string
  createdAt: Date | null
}

export type CategoryDistributionResult = {
  categoryID: string
  categoryName: string
  count: number
}

export type PaginatedProductsResult = {
  data: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type TaxResult = {
  taxID: string
  tva: number
  om: number
  omr: number
}

type ValidatedRelations = {
  categoryID: string
  categoryName: string
  originID: string
  originName: string
  isEU: boolean
  territoryID: string
  territoryName: string
}

function validateProductName(name: string): string {
  const trimmed = name.trim()
  if (trimmed.length === 0) {
    throw new BadRequestError("Le nom du produit ne peut pas être vide")
  }
  if (trimmed.length > 255) {
    throw new BadRequestError("Le nom du produit ne peut pas dépasser 255 caractères")
  }
  return trimmed
}

export class ProductService {
  constructor(private db: DB) {}

  /**
   * Returns the total number of products in the database.
   */
  async count(): Promise<ProductCountResult> {
    const total = await this.db.select({ count: count() }).from(products)
    return { products_count: total[0].count }
  }

  /**
   * Fetches the most recently created products with their category name.
   * @param limit - Number of products to retrieve (default: 5).
   */
  async findRecent(limit = 5): Promise<{ recent_products: RecentProductResult[] }> {
    const recentProductRelations = {
      category: { columns: { categoryName: true } },
    } as const

    const recentProducts = await this.db.query.products.findMany({
      orderBy: (products, { desc }) => [desc(products.createdAt)],
      limit,
      with: recentProductRelations,
    })

    return {
      recent_products: recentProducts.map((p) => ({
        productID: p.productID,
        productName: p.productName,
        categoryName: p.category.categoryName,
        createdAt: p.createdAt,
      })),
    }
  }

  /**
   * Get the distribution of products by category, including category ID, name and product count for each category.
   * @returns Object containing the distribution array.
   */
  async findDistributionByCategory(): Promise<{
    distribution: CategoryDistributionResult[]
  }> {
    const dist = await this.db
      .select({
        categoryID: categories.categoryID,
        categoryName: categories.categoryName,
        count: count(),
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryID, categories.categoryID))
      .groupBy(categories.categoryID, categories.categoryName)

    return { distribution: dist }
  }

  /**
   * Retrieves all available taxes.
   * @returns List of taxes with numeric values.
   */
  async findAllTaxes(): Promise<TaxResult[]> {
    const allTaxes = await this.db.query.taxes.findMany()
    return allTaxes.map((t) => ({
      taxID: t.taxID,
      tva: toDecimalNumber(t.tva),
      om: toDecimalNumber(t.om),
      omr: toDecimalNumber(t.omr),
    }))
  }

  /**
   * Retrieves a paginated list of products with their related data.
   * @param page - Page number (default: 1).
   * @param limit - Number of items per page (default: 20).
   * @returns Paginated result containing products and metadata.
   */
  async findAllPaginated(page = 1, limit = 20): Promise<PaginatedProductsResult> {
    const offset = (page - 1) * limit

    const [totalResult, productsData] = await Promise.all([
      this.db.select({ count: count() }).from(products),
      this.db.query.products.findMany({
        limit,
        offset,
        with: productRelations,
        orderBy: (products, { desc }) => [desc(products.createdAt)],
      }),
    ])

    const total = totalResult[0].count
    const totalPages = Math.ceil(total / limit)

    return {
      data: productsData.map(mapProduct),
      total,
      page,
      limit,
      totalPages,
    }
  }

  /**
   * Finds a single product by its ID with all relations.
   * @param productId - The product UUID.
   * @returns The matching product.
   * @throws NotFoundError if the product does not exist.
   */
  async findById(productId: string): Promise<Product> {
    const productData = await this.db.query.products.findFirst({
      where: eq(products.productID, productId),
      with: productRelations,
    })

    if (!productData) {
      throw new NotFoundError("Produit non trouvé")
    }

    return mapProduct(productData)
  }

  /**
   * Creates a new product after validating relations and deriving the applicable tax.
   * @param input - Product creation payload.
   * @returns The newly created product.
   * @throws ConflictError if a product with the same name already exists.
   * @throws BadRequestError if any relation is invalid.
   */
  async create(input: CreateProductInput): Promise<Product> {
    const { categoryID, originID, territoryID } = input
    const trimmedName = validateProductName(input.productName)

    return await this.db.transaction(async (tx) => {
      const existingProduct = await tx.query.products.findFirst({
        where: eq(products.productName, trimmedName),
      })
      if (existingProduct) {
        throw new ConflictError("Un produit avec ce nom existe déjà")
      }

      const validated = await this.validateRelations(tx, categoryID, originID, territoryID)
      const productID = uuidv7()

      await tx.insert(products).values({
        productID,
        productName: trimmedName,
        categoryID: validated.categoryID,
        originID: validated.originID,
        territoryID: validated.territoryID,
      })

      const productData = await tx.query.products.findFirst({
        where: eq(products.productID, productID),
        with: productRelations,
      })

      if (!productData) {
        throw new NotFoundError("Produit non trouvé après création")
      }

      return mapProduct(productData)
    })
  }

  /**
   * Updates an existing product after checking for name conflicts and validating relations.
   * @param productId - The product UUID to update.
   * @param input - Product update payload.
   * @returns The updated product.
   * @throws NotFoundError if the product does not exist.
   * @throws ConflictError if another product already uses the same name.
   * @throws BadRequestError if any relation is invalid.
   */
  async update(productId: string, input: UpdateProductInput): Promise<Product> {
    const { categoryID, originID, territoryID } = input
    const trimmedName = validateProductName(input.productName)

    return await this.db.transaction(async (tx) => {
      const existingProduct = await tx.query.products.findFirst({
        where: eq(products.productID, productId),
      })
      if (!existingProduct) {
        throw new NotFoundError("Produit non trouvé")
      }

      const duplicateProduct = await tx.query.products.findFirst({
        where: eq(products.productName, trimmedName),
      })
      if (duplicateProduct && duplicateProduct.productID !== productId) {
        throw new ConflictError("Un produit avec ce nom existe déjà")
      }

      const validated = await this.validateRelations(tx, categoryID, originID, territoryID)

      await tx
        .update(products)
        .set({
          productName: trimmedName,
          categoryID: validated.categoryID,
          originID: validated.originID,
          territoryID: validated.territoryID,
          updatedAt: new Date(),
        })
        .where(eq(products.productID, productId))

      const productData = await tx.query.products.findFirst({
        where: eq(products.productID, productId),
        with: productRelations,
      })

      if (!productData) {
        throw new NotFoundError("Produit non trouvé après mise à jour")
      }

      return mapProduct(productData)
    })
  }

  /**
   * Deletes a product by ID if it is not linked to any template.
   * @param productId - The product UUID to delete.
   * @throws NotFoundError if the product does not exist.
   * @throws BadRequestError if the product is linked to one or more templates.
   */
  async delete(productId: string): Promise<void> {
    await this.db.transaction(async (tx) => {
      const existingProduct = await tx.query.products.findFirst({
        where: eq(products.productID, productId),
      })

      if (!existingProduct) {
        throw new NotFoundError("Produit non trouvé")
      }

      const relatedTemplates = await tx
        .select({ count: count() })
        .from(templateProducts)
        .where(eq(templateProducts.productID, productId))

      const templateCount = relatedTemplates[0]?.count ?? 0
      if (templateCount > 0) {
        throw new BadRequestError(
          `Impossible de supprimer ce produit car il est lié à ${templateCount} template(s). Veuillez d'abord retirer ce produit des templates.`,
        )
      }

      await tx.delete(products).where(eq(products.productID, productId))
    })
  }

  /**
   * Validates that the given category, origin and territory exist.
   * @param tx - Drizzle transaction context
   * @param categoryID - Category UUID.
   * @param originID - Origin UUID.
   * @param territoryID - Territory UUID.
   * @returns Validated relation data.
   * @throws BadRequestError if any relation is missing.
   */
  private async validateRelations(
    tx: any,
    categoryID: string,
    originID: string,
    territoryID: string,
  ): Promise<ValidatedRelations> {
    const existingCategory = await tx.query.categories.findFirst({
      where: eq(categories.categoryID, categoryID),
    })

    if (!existingCategory) {
      throw new BadRequestError("La catégorie spécifiée n'existe pas")
    }

    const [existingOrigin, existingTerritory] = await Promise.all([
      tx.query.origins.findFirst({ where: eq(origins.originID, originID) }),
      tx.query.territories.findFirst({ where: eq(territories.territoryID, territoryID) }),
    ])

    if (!existingOrigin) {
      throw new BadRequestError("L'origine spécifiée n'existe pas")
    }
    if (!existingTerritory) {
      throw new BadRequestError("Le territoire spécifié n'existe pas")
    }

    return {
      categoryID: existingCategory.categoryID,
      categoryName: existingCategory.categoryName,
      originID: existingOrigin.originID,
      originName: existingOrigin.originName,
      isEU: existingOrigin.isEU,
      territoryID: existingTerritory.territoryID,
      territoryName: existingTerritory.territoryName,
    }
  }
}
