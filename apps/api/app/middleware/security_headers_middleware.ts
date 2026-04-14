import type { ServerResponse } from "node:http"
import type { HttpContext } from "@adonisjs/core/http"
import type { NextFn } from "@adonisjs/core/types/http"

/**
 * Security headers middleware — applies ONLY to /auth/* routes.
 *
 * @adonisjs/shield handles security headers for all AdonisJS routes
 * via the response pipeline. However, better-auth's toNodeHandler()
 * writes directly to http.ServerResponse, bypassing AdonisJS.
 *
 * This middleware ensures /auth/* routes still receive the same
 * security headers by setting them on the raw response BEFORE
 * toNodeHandler takes over.
 */
export default class SecurityHeadersMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx

    if (request.url() !== "/auth" && !request.url().startsWith("/auth/")) {
      return next()
    }

    const rawRes = response.response as ServerResponse

    rawRes.setHeader("X-Content-Type-Options", "nosniff")
    rawRes.setHeader("X-Frame-Options", "DENY")
    rawRes.setHeader("Referrer-Policy", "strict-origin-when-cross-origin")
    rawRes.setHeader(
      "Content-Security-Policy",
      "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
    )

    if (process.env.NODE_ENV === "production") {
      rawRes.setHeader("Strict-Transport-Security", "max-age=15552000; includeSubDomains")
    }

    return next()
  }
}
