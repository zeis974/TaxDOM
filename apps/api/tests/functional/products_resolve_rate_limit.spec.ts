import type { ApiClient } from "@japa/api-client"
import { test } from "@japa/runner"

import { db } from "#config/database"
import { categories, origins, products, taxes, territories } from "#database/schema"
import { truncateDatabase } from "#tests/helpers/database"

const API_KEY = "test-api-key"
const PRODUCT_NAME = "Riz basmati"
const ORIGIN = "INDE"
const TERRITORY = "REUNION"
const PRODUCT_URL = "https://www.amazon.fr/Riz-basmati/dp/B000000001"

/**
 * Minimal catalogue: one origin, one territory, one taxed category and one
 * product, enough for both a name and a URL lookup to resolve to a 200.
 */
async function seedCatalogue() {
  const [tax] = await db
    .insert(taxes)
    .values({ tva: "8.50", om: "2.50", omr: "1.00" })
    .returning({ taxID: taxes.taxID })
  const [category] = await db
    .insert(categories)
    .values({ categoryName: "Riz et céréales", taxID: tax.taxID })
    .returning({ categoryID: categories.categoryID })
  const [origin] = await db
    .insert(origins)
    .values({ originName: ORIGIN })
    .returning({ originID: origins.originID })
  const [territory] = await db
    .insert(territories)
    .values({ territoryName: TERRITORY })
    .returning({ territoryID: territories.territoryID })

  await db.insert(products).values({
    productName: PRODUCT_NAME,
    categoryID: category.categoryID,
    originID: origin.originID,
    territoryID: territory.territoryID,
  })
}

function resolveByName(client: ApiClient) {
  return client
    .post("/v1/public/products/resolve")
    .header("X-Api-Key", API_KEY)
    .json({ name: PRODUCT_NAME, origin: ORIGIN, territory: TERRITORY })
}

function resolveByUrl(client: ApiClient) {
  return client
    .post("/v1/public/products/resolve")
    .header("X-Api-Key", API_KEY)
    .json({ url: PRODUCT_URL, origin: ORIGIN, territory: TERRITORY })
}

test.group("Public products resolve rate limit", (group) => {
  // truncateDatabase also clears the in-memory limiters, so every test starts
  // with full buckets.
  group.each.setup(async () => {
    await truncateDatabase()
    await seedCatalogue()
  })

  test("throttles the sixth URL resolve within a minute", async ({ client }) => {
    for (let attempt = 0; attempt < 5; attempt++) {
      const response = await resolveByUrl(client)
      response.assertStatus(200)
    }

    const throttled = await resolveByUrl(client)

    throttled.assertStatus(429)
    throttled.assertHeader("retry-after")
    throttled.assertHeader("x-ratelimit-remaining", "0")
  })

  test("does not block name-only resolves after six calls", async ({ client }) => {
    for (let attempt = 0; attempt < 6; attempt++) {
      const response = await resolveByName(client)
      response.assertStatus(200)
    }
  })

  test("does not consume the name bucket with URL resolves", async ({ client, assert }) => {
    for (let attempt = 0; attempt < 5; attempt++) {
      const response = await resolveByUrl(client)
      response.assertStatus(200)
    }

    const throttled = await resolveByUrl(client)
    throttled.assertStatus(429)

    const nameResponse = await resolveByName(client)

    nameResponse.assertStatus(200)
    assert.equal(nameResponse.header("x-ratelimit-limit"), "30")
    assert.equal(nameResponse.header("x-ratelimit-remaining"), "29")
  })
})
