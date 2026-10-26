import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"
import {
  classifyUrlDailyThrottle,
  classifyUrlThrottle,
  getProductsTaxesThrottle,
  resolveProductDailyThrottle,
  resolveProductThrottle,
  searchProductsDailyThrottle,
  searchProductsThrottle,
} from "#start/limiter"

export default function registerPublicProductsRoutes(router: HttpRouterService) {
  const SearchProductsController = controllers.SearchProducts
  const GetProductTaxesController = controllers.GetProductTaxes
  const ResolveProductTaxesController = controllers.ResolveProductTaxes
  const ScrapeProductUrlController = controllers.ScrapeProductUrl

  router
    .get("/products/search", [SearchProductsController, "handle"])
    .use([searchProductsThrottle, searchProductsDailyThrottle])
  router
    .post("/products/taxes", [GetProductTaxesController, "handle"])
    .use([getProductsTaxesThrottle])
  // Unified resolver: parses the merchant URL slug only (no network fetch / no
  // headless browser). Name lookups and URL lookups are throttled in separate
  // buckets, so a burst of URL resolutions cannot lock the name form.
  router
    .post("/products/resolve", [ResolveProductTaxesController, "handle"])
    .use([resolveProductThrottle, resolveProductDailyThrottle])
  router
    .post("/products/scrape", [ScrapeProductUrlController, "handle"])
    .use([classifyUrlThrottle, classifyUrlDailyThrottle])
}
