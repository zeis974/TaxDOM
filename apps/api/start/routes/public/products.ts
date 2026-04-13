import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"
import { searchProductsThrottle } from "#start/limiter"

export default function registerPublicProductsRoutes(router: HttpRouterService) {
  const SearchProductsController = controllers.SearchProducts

  router.get("/products/search", [SearchProductsController, "handle"]).use([searchProductsThrottle])
}
