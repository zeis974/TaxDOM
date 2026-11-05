import { drizzleAdapter } from "@better-auth/drizzle-adapter"
import { betterAuth } from "better-auth/minimal"
import { admin } from "better-auth/plugins"

import { assertAdminAccess, parseAdminEmails } from "../app/lib/admin_access.js"
import { VISITOR_IP_HEADER } from "../app/lib/ip.js"
import * as schema from "../database/auth-schema.js"
import env from "../start/env.js"
import { db } from "./database.js"

export const adminEmails = parseAdminEmails(env.get("ADMIN_EMAILS"))

export const auth = betterAuth({
  appName: "TaxDOM",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  basePath: "/auth",
  trustedOrigins: [env.get("TRUSTED_APP_ORIGIN_URL"), env.get("TRUSTED_DASHBOARD_ORIGIN_URL")],
  advanced: {
    ipAddress: {
      // Better Auth would otherwise walk X-Forwarded-For itself, without the
      // Cloudflare and Next.js handling of `request.ip()`.
      ipAddressHeaders: [VISITOR_IP_HEADER],
    },
  },
  account: {
    accountLinking: {
      trustedProviders: ["google"],
    },
  },
  plugins: [
    admin({
      defaultRole: "user",
    }),
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 300,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          assertAdminAccess(user, adminEmails)
          return { data: { ...user, role: "admin" } }
        },
      },
    },
    session: {
      create: {
        // Blocks existing accounts whose email is no longer listed.
        before: async (session, ctx) => {
          const user = await ctx?.context.internalAdapter.findUserById(session.userId)
          assertAdminAccess(user, adminEmails)
        },
      },
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.get("GOOGLE_CLIENT_ID"),
      clientSecret: env.get("GOOGLE_CLIENT_SECRET"),
    },
  },
})
