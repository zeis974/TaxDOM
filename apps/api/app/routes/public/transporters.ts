import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"

export default function registerPublicTransportersRoutes(router: HttpRouterService) {
  const TransportersController = controllers.Transporters

  router.get("/transporters", [TransportersController, "list"])
}
