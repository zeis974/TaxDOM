import { describe, expect, it } from "vitest"

import { rateLimitKey } from "#lib/ip"

describe("rateLimitKey", () => {
  it("keeps IPv4 addresses as is", () => {
    expect(rateLimitKey("203.0.113.5")).toBe("203.0.113.5")
  })

  it("collapses IPv6 addresses to their /64", () => {
    const prefix = "2001:0db8:0001:0002:0000:0000:0000:0000"
    expect(rateLimitKey("2001:db8:1:2:aaaa::1")).toBe(prefix)
    expect(rateLimitKey("2001:DB8:0001:0002:ffff:ffff:ffff:ffff")).toBe(prefix)
    expect(rateLimitKey("2001:db8::1")).toBe("2001:0db8:0000:0000:0000:0000:0000:0000")
  })

  it("keys IPv4-mapped addresses on the IPv4 address", () => {
    expect(rateLimitKey("::ffff:203.0.113.5")).toBe("203.0.113.5")
    expect(rateLimitKey("::ffff:cb00:7105")).toBe("203.0.113.5")
  })

  it("drops the zone id of an address", () => {
    expect(rateLimitKey("fe80::1%eth0")).toBe(rateLimitKey("fe80::1"))
    expect(rateLimitKey("2001:db8::1%a")).toBe(rateLimitKey("2001:db8::1%b"))
  })

  it("keys loopback in the all-zero /64", () => {
    expect(rateLimitKey("::1")).toBe("0000:0000:0000:0000:0000:0000:0000:0000")
  })

  it("puts anything that is not an IP in one bucket", () => {
    expect(rateLimitKey("not-an-ip")).toBe("invalid-ip")
  })
})
