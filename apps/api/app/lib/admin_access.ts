import { APIError } from "better-auth/api"
import { eq, inArray, notInArray, or } from "drizzle-orm"

import { db } from "#config/database"
import { session, user } from "#database/auth-schema"

/**
 * Error code of a refused dashboard login. Thrown from a Better Auth database
 * hook, it makes the OAuth callback redirect to the error URL with `?error=`.
 */
export const ADMIN_ACCESS_DENIED = "admin_access_denied"

/** Parses the comma-separated `ADMIN_EMAILS` value, lowercased like Better Auth stores emails. */
export function parseAdminEmails(value: string): ReadonlySet<string> {
  return new Set(
    value
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  )
}

export function isAdminEmail(email: string, adminEmails: ReadonlySet<string>) {
  return adminEmails.has(email.toLowerCase())
}

type AccessUser = { email: string; emailVerified: boolean }

export function isDashboardAdmin(
  user: AccessUser | null | undefined,
  adminEmails: ReadonlySet<string>,
) {
  return Boolean(user?.emailVerified && isAdminEmail(user.email, adminEmails))
}

export function assertAdminAccess(
  user: AccessUser | null | undefined,
  adminEmails: ReadonlySet<string>,
) {
  if (!isDashboardAdmin(user, adminEmails)) {
    throw APIError.from("FORBIDDEN", {
      code: ADMIN_ACCESS_DENIED,
      message: "This account is not allowed to access the dashboard",
    })
  }
}

/**
 * `ADMIN_EMAILS` only changes on a restart: revoking at boot cuts a removed admin off everywhere,
 * including the Better Auth endpoints that do not go through `customSession`.
 */
export async function revokeNonAdminSessions(adminEmails: ReadonlySet<string>) {
  const nonAdmins = db
    .select({ id: user.id })
    .from(user)
    .where(or(notInArray(user.email, [...adminEmails]), eq(user.emailVerified, false)))

  await db.delete(session).where(inArray(session.userId, nonAdmins))
}
