import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"
import {
  classifyUrlDailyThrottle,
  classifyUrlThrottle,
  getProductsTaxesThrottle,
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
  // Unified resolver: may scrape a merchant page (headless browser), so it
  // reuses the strict per-IP + daily scrape limits.
  router
    .post("/products/resolve", [ResolveProductTaxesController, "handle"])
    .use([classifyUrlThrottle, classifyUrlDailyThrottle])
  router
    .post("/products/scrape", [ScrapeProductUrlController, "handle"])
    .use([classifyUrlThrottle, classifyUrlDailyThrottle])
}
