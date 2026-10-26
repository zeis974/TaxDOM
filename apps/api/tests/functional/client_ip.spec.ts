import config from "@adonisjs/core/services/config"
import { test } from "@japa/runner"

import { truncateDatabase } from "#tests/helpers/database"

/**
 * The templates bucket allows 5 requests per minute. The Japa client connects
 * over loopback, which is trusted like Traefik and the Next.js server.
 */
test.group("Client IP resolution", (group) => {
  group.each.setup(() => truncateDatabase())

  // Traefik and the Next.js server both forward X-Forwarded-For from a trusted
  // address, so the client is the first untrusted entry.
  test("keys calls on the x-forwarded-for client", async ({ client }) => {
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

  // Behind Cloudflare, the walk stops at the edge address appended by Traefik,
  // and the visitor is the address Cloudflare sets in CF-Connecting-IP.
  test("keys calls on cf-connecting-ip behind a cloudflare edge", async ({ client }) => {
    const templates = "/v1/public/simulator/templates"
    const edge = "162.158.10.20"

    for (let attempt = 0; attempt < 5; attempt++) {
      const response = await client
        .get(templates)
        .header("X-Forwarded-For", `6.6.6.${attempt}, ${edge}`)
        .header("CF-Connecting-IP", "203.0.113.60")
      response.assertStatus(200)
    }

    const throttled = await client
      .get(templates)
      .header("X-Forwarded-For", edge)
      .header("CF-Connecting-IP", "203.0.113.60")
    throttled.assertStatus(429)

    const otherVisitor = await client
      .get(templates)
      .header("X-Forwarded-For", edge)
      .header("CF-Connecting-IP", "203.0.113.61")
    otherVisitor.assertStatus(200)
  })

  // A Cloudflare Worker calling the API sends from a Cloudflare address and its
  // X-Forwarded-For is kept, so walking past Cloudflare addresses would key on
  // a value it chose. Cloudflare reports the Worker address in CF-Connecting-IP.
  test("keys cloudflare worker calls on the worker address", async ({ client }) => {
    const templates = "/v1/public/simulator/templates"
    const worker = "2a06:98c0:3600::103"
    const edge = "162.158.10.20"

    for (let attempt = 0; attempt < 6; attempt++) {
      const response = await client
        .get(templates)
        .header("X-Forwarded-For", `198.51.100.${attempt}, ${worker}, ${edge}`)
        .header("CF-Connecting-IP", worker)
      response.assertStatus(attempt < 5 ? 200 : 429)
    }
  })

  // A peer outside Cloudflare reached the origin directly, so a CF-Connecting-IP
  // it sends is its own choice.
  test("ignores cf-connecting-ip from a peer outside cloudflare", async ({ client }) => {
    const templates = "/v1/public/simulator/templates"

    for (let attempt = 0; attempt < 6; attempt++) {
      const response = await client
        .get(templates)
        .header("X-Forwarded-For", "203.0.113.70")
        .header("CF-Connecting-IP", `198.51.100.${attempt}`)
      response.assertStatus(attempt < 5 ? 200 : 429)
    }
  })

  test("groups IPv6 visitors of the same /64 in one bucket", async ({ client }) => {
    const templates = "/v1/public/simulator/templates"

    for (let attempt = 1; attempt <= 5; attempt++) {
      const response = await client
        .get(templates)
        .header("X-Forwarded-For", `2001:db8:1:2::${attempt}`)
      response.assertStatus(200)
    }

    const sameNetwork = await client.get(templates).header("X-Forwarded-For", "2001:db8:1:2::ff")
    sameNetwork.assertStatus(429)

    const otherNetwork = await client.get(templates).header("X-Forwarded-For", "2001:db8:1:3::1")
    otherNetwork.assertStatus(200)
  })

  // The peer address is not settable from an HTTP test client, so the compiled
  // predicate is checked directly, including the IPv4-mapped IPv6 form Node
  // reports for a loopback socket.
  test("trusts loopback and private peers only", ({ assert }) => {
    const trustProxy = config.get("app.http.trustProxy") as (
      address: string,
      distance: number,
    ) => boolean

    assert.isTrue(trustProxy("127.0.0.1", 0))
    assert.isTrue(trustProxy("::1", 0))
    assert.isTrue(trustProxy("::ffff:127.0.0.1", 0))
    assert.isTrue(trustProxy("10.0.1.5", 0))
    assert.isTrue(trustProxy("172.18.0.3", 0))
    assert.isTrue(trustProxy("192.168.1.10", 0))
    assert.isTrue(trustProxy("fd12:3456::1", 0))
    assert.isTrue(trustProxy("::ffff:10.0.1.5", 0))
    assert.isFalse(trustProxy("172.32.0.1", 0))
    assert.isFalse(trustProxy("173.245.48.1", 0))
    assert.isFalse(trustProxy("2606:4700::1", 0))
    assert.isFalse(trustProxy("203.0.113.1", 0))
  })
})
