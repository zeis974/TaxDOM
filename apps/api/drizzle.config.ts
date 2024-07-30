import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./database/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
})
