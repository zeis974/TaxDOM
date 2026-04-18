import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"

export default function registerTerritoriesRoutes(router: HttpRouterService) {
  const TerritoriesController = controllers.Territories

  router.get("/territories/count", [TerritoriesController, "count"])
  router.get("/territories/top", [TerritoriesController, "top"])
  router.resource("territories", TerritoriesController).apiOnly()
}
