import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"
import { searchProductsThrottle } from "#start/limiter"

export default function registerPublicProductsRoutes(router: HttpRouterService) {
  const ProductsSearchController = controllers.ProductsSearch

  router.get("/products/search", [ProductsSearchController, "handle"]).use([searchProductsThrottle])
}
