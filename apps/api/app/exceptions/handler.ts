import { ExceptionHandler, type HttpContext } from "@adonisjs/core/http"
import app from "@adonisjs/core/services/app"
import { errors as vineJSErrors } from "@vinejs/vine"

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * HTTP status codes that should not be reported to the logger.
   * These are client errors that don't indicate server problems.
   */
  protected ignoreStatuses = [400, 401, 403, 404, 409, 422]

  /**
   * Error codes that should not be reported to the logger.
   * These are application-specific codes for expected error conditions.
   */
  protected ignoreCodes = [
    "BAD_REQUEST",
    "UNAUTHORIZED",
    "FORBIDDEN",
    "NOT_FOUND",
    "CONFLICT",
    "VALIDATION_ERROR",
    "E_VALIDATION_ERROR",
  ]

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof vineJSErrors.E_VALIDATION_ERROR) {
      ctx.response.status(422).send({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          messages: error.messages.messages,
        },
      })
      return
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
