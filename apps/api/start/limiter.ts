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
 * type gets its own bucket: a URL burst must never exhaust the name quota.
 */
function hasUrl(ctx: HttpContext) {
  return Boolean(ctx.request.input("url"))
}

function resolveKey(ctx: HttpContext) {
  return `${hasUrl(ctx) ? "url" : "name"}_${visitorKey(ctx)}`
}

export const resolveProductThrottle = limiter.define("resolveProduct", (ctx) => {
  if (!hasUrl(ctx)) return limiter.allowRequests(30).every("1 minute").usingKey(resolveKey(ctx))
  return limiter.allowRequests(5).every("1 minute").blockFor("5 mins").usingKey(resolveKey(ctx))
})

export const resolveProductDailyThrottle = limiter.define("resolveProductDaily", (ctx) => {
  return limiter
    .allowRequests(hasUrl(ctx) ? 30 : 300)
    .every("1 day")
    .usingKey(resolveKey(ctx))
})
