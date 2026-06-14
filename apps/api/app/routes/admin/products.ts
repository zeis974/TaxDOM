import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"

export default function registerProductsRoutes(router: HttpRouterService) {
  const ProductsController = controllers.Products

  router.get("/products/count", [ProductsController, "count"])
  router.get("/products/recent", [ProductsController, "recent"])
  router.get("/products/distribution", [ProductsController, "distribution"])
  router.get("/products/taxes", [ProductsController, "listTaxes"])
  router.resource("products", ProductsController).apiOnly()
}
