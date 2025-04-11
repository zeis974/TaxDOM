// import * as schema from "#database/schema"
// import env from "#start/env"

import * as schema from "../database/auth-schema.js"
import env from "../start/env.js"

import { betterAuth } from "better-auth"
import { db } from "./database.js"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const auth = betterAuth({
  appName: "TaxDOM",
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),
  basePath: "/auth",
  trustedOrigins: [env.get("TRUSTED_ORIGIN_URL")],
  account: {
    accountLinking: {
      trustedProviders: ["google"],
    },
  },
  socialProviders: {
    google: {
      clientId: env.get("GOOGLE_CLIENT_ID"),
      clientSecret: env.get("GOOGLE_CLIENT_SECRET"),
    },
  },
})
