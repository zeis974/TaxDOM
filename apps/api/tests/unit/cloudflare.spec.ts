import { test } from "@japa/runner"

import { createRangeMatcher, isCloudflareEdge } from "#lib/cloudflare"

test.group("createRangeMatcher", () => {
  test("matches IPv4 and IPv6 ranges on their boundaries", ({ assert }) => {
    const matches = createRangeMatcher(["172.16.0.0/12", "fc00::/7"])

    assert.isFalse(matches("172.15.255.255"))
    assert.isTrue(matches("172.16.0.0"))
    assert.isTrue(matches("172.31.255.255"))
    assert.isFalse(matches("172.32.0.0"))
    assert.isTrue(matches("fd12:3456::1"))
    assert.isFalse(matches("fe00::1"))
  })

  test("matches IPv4-mapped addresses against IPv4 ranges", ({ assert }) => {
    const matches = createRangeMatcher(["10.0.0.0/8"])

    assert.isTrue(matches("::ffff:10.1.2.3"))
    assert.isFalse(matches("::ffff:11.1.2.3"))
  })

  test("rejects anything that is not an IP", ({ assert }) => {
    const matches = createRangeMatcher(["10.0.0.0/8"])

    assert.isFalse(matches(""))
    assert.isFalse(matches("not-an-ip"))
    assert.isFalse(matches(undefined as unknown as string))
  })
})

test.group("isCloudflareEdge", () => {
  test("recognises IPv4 and IPv6 edges", ({ assert }) => {
    assert.isTrue(isCloudflareEdge("173.245.48.1"))
    assert.isTrue(isCloudflareEdge("162.158.10.20"))
    assert.isTrue(isCloudflareEdge("2606:4700::1"))
    assert.isTrue(isCloudflareEdge("2a06:98c0:3600::103"))
  })

  test("recognises IPv4-mapped edges", ({ assert }) => {
    assert.isTrue(isCloudflareEdge("::ffff:162.158.10.20"))
  })

  test("ignores addresses outside the edge ranges", ({ assert }) => {
    assert.isFalse(isCloudflareEdge("173.245.64.0"))
    assert.isFalse(isCloudflareEdge("203.0.113.1"))
    assert.isFalse(isCloudflareEdge("2400:cb01::1"))
  })
})
