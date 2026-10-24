import config from "@adonisjs/core/services/config"
import type { ApiClient } from "@japa/api-client"
import { test } from "@japa/runner"

import { db } from "#config/database"
import { categories, origins, products, taxes, territories } from "#database/schema"
import { truncateDatabase } from "#tests/helpers/database"

const API_KEY = "test-api-key"
const PROXY_SECRET = "test-proxy-secret"
const PRODUCT_URL = "https://www.amazon.fr/Riz-basmati/dp/B000000001"
const ORIGIN = "INDE"
const TERRITORY = "REUNION"

const originalProxySecret = process.env.PROXY_SHARED_SECRET

/**
 * Minimal catalogue, so a URL lookup that passes the limiter also resolves to a 200.
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
    productName: "Riz basmati",
    categoryID: category.categoryID,
    originID: origin.originID,
    territoryID: territory.territoryID,
  })
}

function resolveByUrl(client: ApiClient, headers: Record<string, string> = {}) {
  return client
    .post("/v1/public/products/resolve")
    .header("X-Api-Key", API_KEY)
    .headers(headers)
    .json({ url: PRODUCT_URL, origin: ORIGIN, territory: TERRITORY })
}

function forwardedHeaders(clientIp: string, secret = PROXY_SECRET) {
  return {
    "X-Taxdom-Client-IP": clientIp,
    "X-Taxdom-Proxy-Secret": secret,
  }
}

/**
 * The URL bucket allows 5 requests per minute, and the API trusts
 * X-Taxdom-Client-IP only when it comes with the shared secret. The socket
 * address of the Japa client (loopback) is the fallback bucket.
 */
test.group("Client IP forwarding", (group) => {
  group.each.setup(async () => {
    process.env.PROXY_SHARED_SECRET = PROXY_SECRET
    await truncateDatabase()
    await seedCatalogue()
  })

  group.teardown(() => {
    if (originalProxySecret === undefined) delete process.env.PROXY_SHARED_SECRET
    else process.env.PROXY_SHARED_SECRET = originalProxySecret
  })

  test("gives two forwarded client ips independent url buckets", async ({ client }) => {
    const first = "203.0.113.10"
    const second = "198.51.100.20"

    for (let attempt = 0; attempt < 5; attempt++) {
      const firstResponse = await resolveByUrl(client, forwardedHeaders(first))
      firstResponse.assertStatus(200)

      const secondResponse = await resolveByUrl(client, forwardedHeaders(second))
      secondResponse.assertStatus(200)
    }

    const throttledFirst = await resolveByUrl(client, forwardedHeaders(first))
    throttledFirst.assertStatus(429)
    throttledFirst.assertHeader("x-ratelimit-remaining", "0")

    const throttledSecond = await resolveByUrl(client, forwardedHeaders(second))
    throttledSecond.assertStatus(429)
  })

  test("ignores the header when the secret does not match", async ({ client }) => {
    for (let attempt = 0; attempt < 5; attempt++) {
      const response = await resolveByUrl(
        client,
        forwardedHeaders(`203.0.113.${attempt + 1}`, "wrong-secret"),
      )
      response.assertStatus(200)
    }

    // A sixth distinct IP with a wrong secret lands in the same socket bucket.
    const throttled = await resolveByUrl(client, forwardedHeaders("203.0.113.6", "wrong-secret"))
    throttled.assertStatus(429)
  })

  test("ignores the header when no secret is configured", async ({ client }) => {
    delete process.env.PROXY_SHARED_SECRET

    for (let attempt = 0; attempt < 5; attempt++) {
      const response = await resolveByUrl(client, forwardedHeaders(`203.0.113.${attempt + 1}`))
      response.assertStatus(200)
    }

    const throttled = await resolveByUrl(client, forwardedHeaders("203.0.113.6"))
    throttled.assertStatus(429)
  })

  test("ignores an invalid forwarded ip", async ({ client }) => {
    const invalidIps = ["not-an-ip", "203.0.113", "999.0.113.1", "203.0.113.1:80", "::1/64"]

    for (const clientIp of invalidIps) {
      const response = await resolveByUrl(client, forwardedHeaders(clientIp))
      response.assertStatus(200)
    }

    const throttled = await resolveByUrl(client, forwardedHeaders("not-an-ip-either"))
    throttled.assertStatus(429)
  })

  // Browser calls hit the API directly: no signed header, so the IP comes from
  // proxy-addr once the immediate proxy is trusted.
  test("keys direct calls on the x-forwarded-for client", async ({ client }) => {
    const templates = "/v1/public/simulator/templates"

    for (let attempt = 0; attempt < 5; attempt++) {
      const response = await client.get(templates).header("X-Forwarded-For", "203.0.113.50")
      response.assertStatus(200)
    }

    const throttled = await client.get(templates).header("X-Forwarded-For", "203.0.113.50")
    throttled.assertStatus(429)

    const otherVisitor = await client.get(templates).header("X-Forwarded-For", "203.0.113.51")
    otherVisitor.assertStatus(200)
  })

  // The peer address is not settable from an HTTP test client, so the compiled
  // predicate is checked directly, including the IPv4-mapped IPv6 form Node
  // reports for a loopback socket.
  test("trusts loopback peers and nothing else", ({ assert }) => {
    const trustProxy = config.get("app.http.trustProxy") as (
      address: string,
      distance: number,
    ) => boolean

    assert.isTrue(trustProxy("127.0.0.1", 0))
    assert.isTrue(trustProxy("::1", 0))
    assert.isTrue(trustProxy("::ffff:127.0.0.1", 0))
    assert.isFalse(trustProxy("203.0.113.1", 0))
  })
})
