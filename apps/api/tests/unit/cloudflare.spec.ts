import { describe, expect, it } from "vitest"

import { createRangeMatcher, isCloudflareEdge } from "#lib/cloudflare"

describe("createRangeMatcher", () => {
  it("matches IPv4 and IPv6 ranges on their boundaries", () => {
    const matches = createRangeMatcher(["172.16.0.0/12", "fc00::/7"])

    expect(matches("172.15.255.255")).toBe(false)
    expect(matches("172.16.0.0")).toBe(true)
    expect(matches("172.31.255.255")).toBe(true)
    expect(matches("172.32.0.0")).toBe(false)
    expect(matches("fd12:3456::1")).toBe(true)
    expect(matches("fe00::1")).toBe(false)
  })

  it("matches IPv4-mapped addresses against IPv4 ranges", () => {
    const matches = createRangeMatcher(["10.0.0.0/8"])

    expect(matches("::ffff:10.1.2.3")).toBe(true)
    expect(matches("::ffff:11.1.2.3")).toBe(false)
  })

  it("rejects anything that is not an IP", () => {
    const matches = createRangeMatcher(["10.0.0.0/8"])

    expect(matches("")).toBe(false)
    expect(matches("not-an-ip")).toBe(false)
    expect(matches(undefined as unknown as string)).toBe(false)
  })
})

describe("isCloudflareEdge", () => {
  it("recognises IPv4 and IPv6 edges", () => {
    expect(isCloudflareEdge("173.245.48.1")).toBe(true)
    expect(isCloudflareEdge("162.158.10.20")).toBe(true)
    expect(isCloudflareEdge("2606:4700::1")).toBe(true)
    expect(isCloudflareEdge("2a06:98c0:3600::103")).toBe(true)
  })

  it("recognises IPv4-mapped edges", () => {
    expect(isCloudflareEdge("::ffff:162.158.10.20")).toBe(true)
  })

  it("ignores addresses outside the edge ranges", () => {
    expect(isCloudflareEdge("173.245.64.0")).toBe(false)
    expect(isCloudflareEdge("203.0.113.1")).toBe(false)
    expect(isCloudflareEdge("2400:cb01::1")).toBe(false)
  })
})
