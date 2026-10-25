/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import type { HttpContext } from "@adonisjs/core/http"
import limiter from "@adonisjs/limiter/services/main"

import { rateLimitKey } from "#lib/ip"

/**
 * Every limiter keys on the visitor, with IPv6 visitors grouped by /64. A
 * limiter without an explicit key would fall back to the full address.
 */
function visitorKey(ctx: HttpContext) {
  return rateLimitKey(ctx.request.ip())
}

export const calculateParcelThrottle = limiter.define("calculateParcel", (ctx) => {
  return limiter.allowRequests(5).every("1 minute").usingKey(visitorKey(ctx))
})

export const getProductsTaxesThrottle = limiter.define("getProductsTaxes", (ctx) => {
  return limiter.allowRequests(5).every("1 minute").usingKey(visitorKey(ctx))
})

export const searchProductsThrottle = limiter.define("searchProductsName", (ctx) => {
  return limiter.allowRequests(50).every("1 minute").blockFor("5 mins").usingKey(visitorKey(ctx))
})

export const searchProductsDailyThrottle = limiter.define("searchProductsDaily", (ctx) => {
  return limiter.allowRequests(100).every("1 day").usingKey(visitorKey(ctx))
})

export const getTemplatesThrottle = limiter.define("getTemplates", (ctx) => {
  return limiter.allowRequests(5).every("1 minute").usingKey(visitorKey(ctx))
})

export const transporterRulesThrottle = limiter.define("transporterRules", (ctx) => {
  return limiter.allowRequests(10).every("1 minute").usingKey(visitorKey(ctx))
})

export const classifyUrlThrottle = limiter.define("classifyUrl", (ctx) => {
  return limiter.allowRequests(5).every("1 minute").blockFor("5 mins").usingKey(visitorKey(ctx))
})

export const classifyUrlDailyThrottle = limiter.define("classifyUrlDaily", (ctx) => {
  return limiter.allowRequests(30).every("1 day").usingKey(visitorKey(ctx))
})

/**
 * `/products/resolve` accepts a product name OR a merchant URL. A name lookup
 * is a database search while a URL lookup also parses the slug, so each input
 * type gets its own bucket: a URL burst must never exhaust the quota shared by
 * everyone using the name form. The limiters that do not apply to a request
 * opt out with `noLimit()`, which keeps the route wiring simple.
 */
function hasUrl(ctx: HttpContext) {
  return Boolean(ctx.request.input("url"))
}

export const resolveProductNameThrottle = limiter.define("resolveProductName", (ctx) => {
  if (hasUrl(ctx)) return limiter.noLimit()
  return limiter.allowRequests(30).every("1 minute").usingKey(visitorKey(ctx))
})

export const resolveProductNameDailyThrottle = limiter.define("resolveProductNameDaily", (ctx) => {
  if (hasUrl(ctx)) return limiter.noLimit()
  return limiter.allowRequests(300).every("1 day").usingKey(visitorKey(ctx))
})

export const resolveProductUrlThrottle = limiter.define("resolveProductUrl", (ctx) => {
  if (!hasUrl(ctx)) return limiter.noLimit()
  return limiter.allowRequests(5).every("1 minute").blockFor("5 mins").usingKey(visitorKey(ctx))
})

export const resolveProductUrlDailyThrottle = limiter.define("resolveProductUrlDaily", (ctx) => {
  if (!hasUrl(ctx)) return limiter.noLimit()
  return limiter.allowRequests(30).every("1 day").usingKey(visitorKey(ctx))
})
