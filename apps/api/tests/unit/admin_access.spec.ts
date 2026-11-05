import { test } from "@japa/runner"

import { ADMIN_ACCESS_DENIED, assertAdminAccess, parseAdminEmails } from "#lib/admin_access"

test.group("Admin access", () => {
  const adminEmails = parseAdminEmails(" Admin@Example.com, ,second@example.com ")

  test("parses a trimmed, lowercased allowlist", ({ assert }) => {
    assert.deepEqual([...adminEmails], ["admin@example.com", "second@example.com"])
  })

  test("accepts a verified listed email whatever its case", ({ assert }) => {
    assert.doesNotThrow(() =>
      assertAdminAccess({ email: "ADMIN@example.com", emailVerified: true }, adminEmails),
    )
  })

  test("refuses an unlisted, unverified or missing account", ({ assert }) => {
    const refused = [
      { email: "intruder@example.com", emailVerified: true },
      { email: "admin@example.com", emailVerified: false },
      null,
    ]

    for (const user of refused) {
      try {
        assertAdminAccess(user, adminEmails)
        assert.fail("expected the account to be refused")
      } catch (error) {
        assert.equal((error as { body?: { code?: string } }).body?.code, ADMIN_ACCESS_DENIED)
      }
    }
  })
})
