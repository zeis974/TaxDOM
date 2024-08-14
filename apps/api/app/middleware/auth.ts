import type { HttpContext } from "@adonisjs/core/http"
import type { NextFn } from "@adonisjs/core/types/http"

import env from "#start/env"

export default class Auth {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const apiKey = request.header("X-API-Key")

    if (!apiKey || apiKey !== env.get("API_KEY")) {
      return response.unauthorized("Unauthorized access")
    }

    await next()
  }
}
