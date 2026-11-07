import { test } from "@japa/runner"

import {
  ADMIN_ACCESS_DENIED,
  assertAdminAccess,
  isDashboardAdmin,
  parseAdminEmails,
} from "#lib/admin_access"

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
      let error: { body?: { code?: string } } | undefined
      try {
        assertAdminAccess(user, adminEmails)
      } catch (caught) {
        error = caught as typeof error
      }

      assert.equal(error?.body?.code, ADMIN_ACCESS_DENIED)
    }
  })

  test("requires the admin role on top of a listed email", ({ assert }) => {
    const listed = { email: "admin@example.com", emailVerified: true }

    assert.isTrue(isDashboardAdmin({ ...listed, role: "admin" }, adminEmails))
    assert.isFalse(isDashboardAdmin({ ...listed, role: "user" }, adminEmails))
    assert.isFalse(
      isDashboardAdmin(
        { email: "former@example.com", emailVerified: true, role: "admin" },
        adminEmails,
      ),
    )
  })
})
