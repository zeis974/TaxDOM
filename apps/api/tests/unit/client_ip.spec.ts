import { test } from "@japa/runner"

import { rateLimitKey } from "#lib/ip"

test.group("rateLimitKey", () => {
  test("keeps IPv4 addresses as is", ({ assert }) => {
    assert.equal(rateLimitKey("203.0.113.5"), "203.0.113.5")
  })

  test("collapses IPv6 addresses to their /64", ({ assert }) => {
    const prefix = "2001:0db8:0001:0002:0000:0000:0000:0000"
    assert.equal(rateLimitKey("2001:db8:1:2:aaaa::1"), prefix)
    assert.equal(rateLimitKey("2001:DB8:0001:0002:ffff:ffff:ffff:ffff"), prefix)
    assert.equal(rateLimitKey("2001:db8::1"), "2001:0db8:0000:0000:0000:0000:0000:0000")
  })

  test("keys IPv4-mapped addresses on the IPv4 address", ({ assert }) => {
    assert.equal(rateLimitKey("::ffff:203.0.113.5"), "203.0.113.5")
    assert.equal(rateLimitKey("::ffff:cb00:7105"), "203.0.113.5")
  })

  test("drops the zone id of an address", ({ assert }) => {
    assert.equal(rateLimitKey("fe80::1%eth0"), rateLimitKey("fe80::1"))
    assert.equal(rateLimitKey("2001:db8::1%a"), rateLimitKey("2001:db8::1%b"))
  })

  test("keys loopback in the all-zero /64", ({ assert }) => {
    assert.equal(rateLimitKey("::1"), "0000:0000:0000:0000:0000:0000:0000:0000")
  })

  test("puts anything that is not an IP in one bucket", ({ assert }) => {
    assert.equal(rateLimitKey("not-an-ip"), "invalid-ip")
  })
})
