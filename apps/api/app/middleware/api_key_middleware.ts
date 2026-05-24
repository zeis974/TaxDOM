import type { HttpContext } from "@adonisjs/core/http"
import type { NextFn } from "@adonisjs/core/types/http"
import logger from "@adonisjs/core/services/logger"
import env from "#start/env"

const WWW_AUTH_HEADER = "ApiKey"

export default class ApiKeyMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx
    const method = request.method()
    const isReadOnly = method === "GET" || method === "HEAD" || method === "OPTIONS"

    if (isReadOnly) {
      return next()
    }

    const apiKey = env.get("API_KEY")
    if (!apiKey) {
      logger.error("API_KEY environment variable is not configured")
      return response.status(500).json({ error: "Server misconfiguration" })
    }

    const provided = request.header("X-Api-Key")
    if (!provided) {
      return response
        .status(401)
        .header("WWW-Authenticate", WWW_AUTH_HEADER)
        .json({ error: "Unauthorized" })
    }

    if (provided !== apiKey) {
      logger.warn("Invalid API key attempt from %s to %s %s", request.ip(), method, request.url())
      return response
        .status(401)
        .header("WWW-Authenticate", WWW_AUTH_HEADER)
        .json({ error: "Unauthorized" })
    }

    return next()
  }
}
