import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import type { NextFn } from "@adonisjs/core/types/http"

import { auth } from "#config/auth"

export default class Auth {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx

    ctx.authenticatedUser = null

    const headers = new Headers()
    for (const [key, value] of Object.entries(request.headers())) {
      if (value) {
        headers.set(key, Array.isArray(value) ? value.join(", ") : value)
      }
    }

    let session: Awaited<ReturnType<typeof auth.api.getSession>>
    try {
      session = await auth.api.getSession({
        headers,
      })
    } catch (err) {
      logger.error({ err }, "[AUTH]: Failed to validate session")
      return response.status(500).json({ error: "Authentication check failed" })
    }

    if (!session?.user) {
      return response.unauthorized({ error: "Unauthorized access" })
    }

    if (session.user.role !== "admin") {
      return response.status(403).json({ error: "Admin access required" })
    }

    ctx.authenticatedUser = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role ?? null,
    }

    return next()
  }
}
