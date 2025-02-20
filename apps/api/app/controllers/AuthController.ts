import type { HttpContext } from "@adonisjs/core/http"

import { auth } from "#config/auth"
import { toNodeHandler } from "better-auth/node"

export default class AuthController {
  async handle({ request, response }: HttpContext) {
    return toNodeHandler(auth.handler)(request.request, response.response)
  }
}
