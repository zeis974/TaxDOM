import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"
import { getProductsTaxesThrottle, searchProductsThrottle } from "#start/limiter"

export default function registerPublicProductsRoutes(router: HttpRouterService) {
  const SearchProductsController = controllers.SearchProducts
  const GetProductTaxesController = controllers.GetProductTaxes

  router.get("/products/search", [SearchProductsController, "handle"]).use([searchProductsThrottle])
  router
    .post("/products/taxes", [GetProductTaxesController, "handle"])
    .use([getProductsTaxesThrottle])
}
