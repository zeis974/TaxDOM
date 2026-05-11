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

const DEFAULT_SYNONYMS: Record<string, string[]> = {
  telephone: ["mobile", "portable", "cellulaire"],
  pc: ["ordinateur", "laptop", "mac", "macbook"],
  cafe: ["café"],
  eau: ["thé", "infusions"],
  vin: ["raisin"],
  biere: ["bière", "brassin"],
  smartphone: ["iphone", "téléphone", "android", "galaxy"],
  ordinateur: ["macbook", "laptop", "pc", "mac", "notebook"],
}

export async function configureProductsIndex() {
  const existing = await productsIndex.getSettings()
  const existingSynonyms = existing.synonyms ?? {}

  // User-defined synonyms take precedence over defaults
  const synonyms = { ...DEFAULT_SYNONYMS, ...existingSynonyms }

  await productsIndex.updateSettings({
    searchableAttributes: ["productName", "categoryName"],
    displayedAttributes: ["id", "productName", "categoryName", "categoryID"],
    sortableAttributes: ["productName"],
    filterableAttributes: ["categoryID"],
    typoTolerance: {
      enabled: true,
      minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 },
    },
    synonyms,
    rankingRules: ["words", "typo", "proximity", "attribute", "sort", "exactness"],
  })
}

export async function fullReindex() {
  await configureProductsIndex()
  await indexProducts()
}
