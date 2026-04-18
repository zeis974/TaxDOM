import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"

export default function registerPublicTerritoriesRoutes(router: HttpRouterService) {
  const TerritoriesController = controllers.Territories

  router.get("/territories", [TerritoriesController, "list"])
}
