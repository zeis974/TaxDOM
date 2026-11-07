import { APIError } from "better-auth/api"

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

function isAllowedUser(user: AccessUser | null | undefined, adminEmails: ReadonlySet<string>) {
  return Boolean(user?.emailVerified && isAdminEmail(user.email, adminEmails))
}

export function isDashboardAdmin(
  user: (AccessUser & { role?: string | null }) | null | undefined,
  adminEmails: ReadonlySet<string>,
) {
  return user?.role === "admin" && isAllowedUser(user, adminEmails)
}

export function assertAdminAccess(
  user: AccessUser | null | undefined,
  adminEmails: ReadonlySet<string>,
) {
  if (!isAllowedUser(user, adminEmails)) {
    throw APIError.from("FORBIDDEN", {
      code: ADMIN_ACCESS_DENIED,
      message: "This account is not allowed to access the dashboard",
    })
  }
}
