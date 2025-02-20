import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "turso",
  schema: ["./database/schema.ts", "./database/auth-schema.ts"],
  out: "./database/migrations",
  dbCredentials: {
    url: process.env.DB_URL as string,
    authToken: process.env.DB_AUTH_TOKEN as string,
  },
  breakpoints: true,
  verbose: true,
})
