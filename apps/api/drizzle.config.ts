import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  schema: ["./database/schema.ts", "./database/auth-schema.ts"],
  out: "./database/migrations",
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
  breakpoints: true,
  verbose: true,
})
