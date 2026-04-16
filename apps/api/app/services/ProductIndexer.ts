import { eq } from "drizzle-orm"
import { productsIndex } from "#lib/meilisearch"
import { db } from "#config/database"
import { products, categories } from "#database/schema"

export async function indexProducts() {
  const data = await db
    .select({
      id: products.productID,
      productName: products.productName,
      categoryName: categories.categoryName,
      categoryID: products.categoryID,
    })
    .from(products)
    .leftJoin(categories, eq(categories.categoryID, products.categoryID))

  if (!data.length) return

  await productsIndex.addDocuments(data, { primaryKey: "id" })
}

export async function configureProductsIndex() {
  await productsIndex.updateSettings({
    searchableAttributes: ["productName", "categoryName"],
    displayedAttributes: ["id", "productName", "categoryName", "categoryID"],
    sortableAttributes: ["productName"],
    filterableAttributes: ["categoryID"],
    typoTolerance: {
      enabled: true,
      minWordSizeForTypos: {
        oneTypo: 4,
        twoTypos: 8,
      },
    },
    synonyms: {
      telephone: ["mobile", "portable", "cellulaire"],
      pc: ["ordinateur", "laptop", "mac", "macbook"],
      cafe: ["café"],
      eau: ["thé", " infusions"],
      vin: ["raisin"],
      biere: ["bière", "brassin"],
    },
    rankingRules: [
      "words",
      "typo",
      "proximity",
      "attributeRank",
      "sort",
      "wordPosition",
      "exactness",
    ],
  })
}

export async function fullReindex() {
  await configureProductsIndex()
  await indexProducts()
}
