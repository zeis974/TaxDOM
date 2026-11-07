import { randomUUID } from "node:crypto"
import { test } from "@japa/runner"
import { makeSignature } from "better-auth/crypto"

import { adminEmails, auth } from "#config/auth"
import { db } from "#config/database"
import { session, user } from "#database/auth-schema"
import { ADMIN_ACCESS_DENIED, revokeNonAdminSessions } from "#lib/admin_access"
import { truncateDatabase } from "#tests/helpers/database"

const [LISTED_EMAIL] = adminEmails
const GOOGLE_SIGN_UP = { method: "oauth", oauth: { providerId: "google" } }

/**
 * Inserts the user and its session directly: the Better Auth hooks would refuse the cases
 * this suite needs, such as an admin whose email has since left `ADMIN_EMAILS`.
 */
async function signIn(email: string) {
  const context = await auth.$context
  const userId = randomUUID()
  const token = randomUUID()

  await db.insert(user).values({ id: userId, name: "Test", email, emailVerified: true })
  await db.insert(session).values({
    id: randomUUID(),
    token,
    userId,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    updatedAt: new Date(),
  })

  const signed = `${token}.${await makeSignature(token, context.secret)}`
  return { userId, cookie: `${context.authCookies.sessionToken.name}=${signed}` }
}

test.group("Admin access: account creation", (group) => {
  group.each.setup(() => truncateDatabase())

  test("creates an account for a listed email", async ({ assert }) => {
    const context = await auth.$context

    const created = await context.internalAdapter.createUser(
      { email: LISTED_EMAIL, name: "Admin", emailVerified: true },
      GOOGLE_SIGN_UP,
    )

    assert.equal(created.email, LISTED_EMAIL)
  })

  test("refuses an unlisted email", async ({ assert }) => {
    const context = await auth.$context

    const error = await context.internalAdapter
      .createUser(
        { email: "intruder@example.com", name: "Intruder", emailVerified: true },
        GOOGLE_SIGN_UP,
      )
      .then(() => null)
      .catch((reason: { body?: { code?: string } }) => reason)

    assert.equal(error?.body?.code, ADMIN_ACCESS_DENIED)
    assert.lengthOf(await db.select().from(user), 0)
  })
})

test.group("Admin access: sessions", (group) => {
  group.each.setup(() => truncateDatabase())

  test("lets a listed admin reach the admin API", async ({ client }) => {
    const { cookie } = await signIn(LISTED_EMAIL)

    const response = await client.get("/v1/admin/territories").header("cookie", cookie)

    response.assertStatus(200)
  })

  test("drops the session of an admin removed from the allowlist", async ({ client, assert }) => {
    const { cookie } = await signIn("former-admin@example.com")

    const sessionResponse = await client.get("/auth/get-session").header("cookie", cookie)
    assert.isNull(sessionResponse.body())

    const response = await client.get("/v1/admin/territories").header("cookie", cookie)
    response.assertStatus(401)
  })

  test("exposes no user management endpoint", async ({ client }) => {
    const { cookie } = await signIn(LISTED_EMAIL)

    const response = await client
      .post("/auth/admin/update-user")
      .header("cookie", cookie)
      .json({ userId: "any", data: { email: "other@example.com" } })

    response.assertStatus(404)
  })
})

test.group("Admin access: boot revocation", (group) => {
  group.each.setup(() => truncateDatabase())

  test("revokes only the sessions of accounts outside the allowlist", async ({ assert }) => {
    const admin = await signIn(LISTED_EMAIL)
    await signIn("former-admin@example.com")

    await revokeNonAdminSessions(adminEmails)

    const remaining = await db.select({ userId: session.userId }).from(session)
    assert.deepEqual(remaining, [{ userId: admin.userId }])
  })
})
