import { defineConfig } from "@adonisjs/cors"
import env from "#start/env"

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,
  origin: [env.get("TRUSTED_APP_ORIGIN_URL"), env.get("TRUSTED_DASHBOARD_ORIGIN_URL")],
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"],
  headers: true,
  // Let browser calls read how long to wait once they hit a 429.
  exposeHeaders: ["Retry-After", "X-RateLimit-Remaining"],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
