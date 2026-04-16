import { eq } from "drizzle-orm"
import { productsIndex } from "#lib/meilisearch"
import { db } from "#config/database"
import { products, categories } from "#database/schema"
import logger from "@adonisjs/core/services/logger"

async function getProductDocument(id: string) {
  const data = await db
    .select({
      id: products.productID,
      productName: products.productName,
      categoryName: categories.categoryName,
      categoryID: products.categoryID,
    })
    .from(products)
    .leftJoin(categories, eq(categories.categoryID, products.categoryID))
    .where(eq(products.productID, id))
    .limit(1)

  return data[0] ?? null
}

export async function onProductCreated(productID: string) {
  const doc = await getProductDocument(productID)
  if (!doc) return
  productsIndex
    .addDocuments([doc])
    .catch((err: unknown) => logger.error("Meilisearch add failed for %s: %O", productID, err))
}

export async function onProductUpdated(productID: string) {
  const doc = await getProductDocument(productID)
  if (doc) {
    productsIndex
      .updateDocuments([doc])
      .catch((err: unknown) => logger.error("Meilisearch update failed for %s: %O", productID, err))
  } else {
    onProductDeleted(productID)
  }
}

export async function onProductDeleted(productID: string) {
  productsIndex
    .deleteDocument(productID)
    .catch((err: unknown) => logger.error("Meilisearch delete failed for %s: %O", productID, err))
}
