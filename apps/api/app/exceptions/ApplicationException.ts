import { Exception } from "@adonisjs/core/exceptions"
import type { HttpContext } from "@adonisjs/core/http"

import { makeErrorPayload, type ErrorCode } from "#lib/api_error"

export default class ApplicationException extends Exception {
  readonly code: ErrorCode

  constructor(message: string, status: number, code: ErrorCode) {
    super(message, { status })
    this.code = code
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send(makeErrorPayload(error.code, error.message))
  }
}
