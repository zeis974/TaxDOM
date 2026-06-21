import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"
// import { transporterRulesThrottle } from "#start/limiter"

export default function registerTransportersRoutes(router: HttpRouterService) {
  const TransportersController = controllers.Transporters
  // const TransporterRulesController = controllers.TransporterRules

  router.get("/transporters/count", [TransportersController, "count"])
  router.resource("transporters", TransportersController).apiOnly()

  // NOTE: TransporterRules routes are temporarily disabled because the
  // required database tables (transporterFlowNodes, transporterFlowEdges,
  // transporterFeeRules) do not exist in the schema yet.
  // router
  //   .get("/transporters/:transporterId/rules", [TransporterRulesController, "show"])
  //   .use([transporterRulesThrottle])
  // router
  //   .post("/transporters/:transporterId/rules/flow", [TransporterRulesController, "saveFlow"])
  //   .use([transporterRulesThrottle])
  // router
  //   .post("/transporters/:transporterId/rules/fees", [TransporterRulesController, "saveRules"])
  //   .use([transporterRulesThrottle])
  // router
  //   .post("/transporters/:transporterId/rules", [TransporterRulesController, "saveAll"])
  //   .use([transporterRulesThrottle])
}
