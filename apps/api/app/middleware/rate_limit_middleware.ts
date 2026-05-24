import type { HttpContext } from "@adonisjs/core/http"
import type { NextFn } from "@adonisjs/core/types/http"
import { errors as limiterErrors } from "@adonisjs/limiter"
import limiter from "@adonisjs/limiter/services/main"

const rateLimiter = limiter.use({
  requests: 20,
  duration: "1 minute",
})


export default class RateLimitMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx


    try {
      await rateLimiter.consume(request.ip())
    } catch (err) {
      if (err instanceof limiterErrors.ThrottleException) {
        const retryAfter = err.response?.availableIn ?? 60
        return response
          .status(429)
          .header("Retry-After", String(retryAfter))
          .json({ error: "Too many requests" })
      }
      throw err
    }

    return next()
  }
}
