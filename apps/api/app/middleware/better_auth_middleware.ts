import type { ServerResponse } from "node:http"
import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import type { NextFn } from "@adonisjs/core/types/http"
import { toNodeHandler } from "better-auth/node"

import { auth } from "#config/auth"
import env from "#start/env"

const ALLOWED_HEADERS = "Content-Type, Authorization"

export default class BetterAuthMiddleware {
  private authHandler: ReturnType<typeof toNodeHandler>

  constructor() {
    this.authHandler = toNodeHandler(auth)
  }

  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx

    if (request.url() !== "/auth" && !request.url().startsWith("/auth/")) {
      return next()
    }

    const rawRes = response.response as ServerResponse
    const origin = env.get("TRUSTED_DASHBOARD_ORIGIN_URL")

    rawRes.setHeader("Access-Control-Allow-Origin", origin)
    rawRes.setHeader("Access-Control-Allow-Credentials", "true")
    rawRes.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, OPTIONS")
    rawRes.setHeader("Access-Control-Allow-Headers", ALLOWED_HEADERS)

    if (request.method() === "OPTIONS") {
      rawRes.writeHead(204)
      rawRes.end()
      return
    }

    try {
      logger.info("Better Auth request received", {
        url: request.url(),
        method: request.method(),
        contentType: request.header("content-type"),
      })

      const req = request.request
      req.url = request.request.url

      /** biome-ignore lint/suspicious/noExplicitAny: The Better Auth library expects a Node.js request object, which has an `originalUrl` property.
       * Adonis's request object doesn't have this property, so we need to add it manually.
       * Using `any` here is a pragmatic choice to avoid TypeScript errors. */
      ;(req as any).originalUrl = request.url()
      await this.authHandler(req, rawRes)
    } catch (error) {
      logger.error("Error in Better Auth middleware", error)

      if (!rawRes.headersSent) {
        rawRes.writeHead(500, { "Content-Type": "application/json" })
        rawRes.end(JSON.stringify({ error: "Internal server error" }))
      }
    }
  }
}
