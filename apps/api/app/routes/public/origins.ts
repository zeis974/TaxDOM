import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"

export default function registerPublicOriginsRoutes(router: HttpRouterService) {
  const OriginsController = controllers.Origins

  router.get("/origins", [OriginsController, "list"])
}
