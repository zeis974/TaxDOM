import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"
import { calculateParcelThrottle, getTemplatesThrottle } from "#start/limiter"

export default function registerSimulatorRoutes(router: HttpRouterService) {
  const CalculateParcelController = controllers.CalculateParcel
  const GetTemplatesController = controllers.GetTemplates

  router
    .post("/simulator/parcel", [CalculateParcelController, "handle"])
    .use([calculateParcelThrottle])
  router.get("/simulator/templates", [GetTemplatesController, "handle"]).use([getTemplatesThrottle])
}
