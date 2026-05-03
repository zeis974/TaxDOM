import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"

export default function registerCategoriesRoutes(router: HttpRouterService) {
  const CategoriesController = controllers.Categories

  router.get("/categories/count", [CategoriesController, "count"])
  router.get("/categories/stats", [CategoriesController, "withStats"])
  router.resource("categories", CategoriesController).apiOnly()
}
