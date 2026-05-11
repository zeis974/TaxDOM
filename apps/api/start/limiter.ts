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

import limiter from "@adonisjs/limiter/services/main"

export const calculateParcelThrottle = limiter.define("calculateParcel", () => {
  return limiter.allowRequests(5).every("1 minute")
})

export const getProductsTaxesThrottle = limiter.define("getProductsTaxes", () => {
  return limiter.allowRequests(5).every("1 minute")
})

export const searchProductsThrottle = limiter.define("searchProductsName", (ctx) => {
  return limiter.allowRequests(50).every("1 minute").blockFor("5 mins").usingKey(ctx.request.ip())
})

export const searchProductsDailyThrottle = limiter.define("searchProductsDaily", (ctx) => {
  return limiter.allowRequests(100).every("1 day").usingKey(ctx.request.ip())
})

export const getTemplatesThrottle = limiter.define("getTemplates", () => {
  return limiter.allowRequests(5).every("1 minute")
})

export const transporterRulesThrottle = limiter.define("transporterRules", () => {
  return limiter.allowRequests(10).every("1 minute")
})
