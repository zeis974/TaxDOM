import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"

export default function registerOriginsRoutes(router: HttpRouterService) {
  const OriginsController = controllers.Origins

  router.get("/origins/count", [OriginsController, "count"])
  router.get("/origins/top", [OriginsController, "top"])
  router.resource("origins", OriginsController).apiOnly()
}
