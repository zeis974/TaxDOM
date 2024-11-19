import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "turso",
  schema: "./database/schema.ts",
  out: "./database/migrations",
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
  breakpoints: true,
  verbose: true,
})
