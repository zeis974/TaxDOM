import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"
import SearchConfigController from "#controllers/SearchConfigController"

export default function registerProductsRoutes(router: HttpRouterService) {
  const ProductsController = controllers.Products
  const SearchConfig = SearchConfigController

  router.get("/products/count", [ProductsController, "count"])
  router.get("/products/recent", [ProductsController, "recent"])
  router.get("/products/distribution", [ProductsController, "distribution"])
  router.get("/products/taxes", [ProductsController, "listTaxes"])
  router.resource("products", ProductsController).apiOnly()

  router.get("/products/search-config", [SearchConfig, "getConfig"])
  router.put("/products/search-config", [SearchConfig, "updateConfig"])
  router.get("/products/synonyms", [SearchConfig, "getSynonyms"])
  router.put("/products/synonyms", [SearchConfig, "updateSynonyms"])
}
