import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import type { NextFn } from "@adonisjs/core/types/http"

import { auth } from "#config/auth"
import env from "#start/env"

export default class Auth {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { verifySession: boolean } = { verifySession: false },
  ) {
    const { request, response } = ctx
    const Authorization = request.header("Authorization")
    const apiKey = Authorization?.match(/Bearer (.*)/)?.[1] ?? null

    if (options.verifySession) {
      if (!apiKey || apiKey !== env.get("API_KEY")) {
        return response.unauthorized({ error: "Invalid API key" })
      }

      try {
        const headers = new Headers()
        for (const [key, value] of Object.entries(request.headers())) {
          if (value) {
            headers.set(key, Array.isArray(value) ? value.join(", ") : value)
          }
        }

        const session = await auth.api.getSession({
          headers,
        })

        if (session?.user?.role === "admin") {
          ;(ctx as Record<string, unknown>).__authenticatedUser = session.user
          return await next()
        }
      } catch (err) {
        logger.error(err)
      }

      return response.unauthorized({ error: "Unauthorized access" })
    }

    if (apiKey && apiKey === env.get("API_KEY")) {
      return await next()
    }

    return response.unauthorized({ error: "Invalid API key" })
  }
}
