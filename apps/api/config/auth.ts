import * as schema from "../database/auth-schema.js"

// import env from "#start/env"
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
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})
