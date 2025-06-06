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

export const searchProductsNameThrottle = limiter.define("searchProductsName", () => {
  return limiter.allowRequests(25).every("1 minute")
})

export const getTemplatesThrottle = limiter.define("getTemplates", () => {
  return limiter.allowRequests(5).every("1 minute")
})
