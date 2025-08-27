import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import * as schema from "../database/auth-schema.js"
import env from "../start/env.js"
import { db } from "./database.js"

export const auth = betterAuth({
  appName: "TaxDOM",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  basePath: "/auth",
  trustedOrigins: [env.get("TRUSTED_ORIGIN_URL")],
  account: {
    accountLinking: {
      trustedProviders: ["google"],
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  socialProviders: {
    google: {
      clientId: env.get("GOOGLE_CLIENT_ID"),
      clientSecret: env.get("GOOGLE_CLIENT_SECRET"),
    },
  },
})
