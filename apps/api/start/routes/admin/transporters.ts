import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"
import { transporterRulesThrottle } from "#start/limiter"

export default function registerTransportersRoutes(router: HttpRouterService) {
  const TransportersController = controllers.Transporters
  const TransporterRulesController = controllers.TransporterRules

  router.get("/transporters/count", [TransportersController, "count"])
  router.get("/transporters/list", [TransportersController, "list"])
  router.resource("transporters", TransportersController).apiOnly()

  router
    .get("/transporters/:transporterId/rules", [TransporterRulesController, "show"])
    .use([transporterRulesThrottle])
  router
    .post("/transporters/:transporterId/rules/flow", [TransporterRulesController, "saveFlow"])
    .use([transporterRulesThrottle])
  router
    .post("/transporters/:transporterId/rules/fees", [TransporterRulesController, "saveRules"])
    .use([transporterRulesThrottle])
  router
    .post("/transporters/:transporterId/rules", [TransporterRulesController, "saveAll"])
    .use([transporterRulesThrottle])
}
