/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router"

import { middleware } from "#start/kernel"
import {
  calculateParcelThrottle,
  getTemplatesThrottle,
  searchProductsThrottle,
  transporterRulesThrottle,
} from "#start/limiter"

import { controllers } from "#generated/controllers"

// ─── Public routes ───────────────────────────────────────
router
  .group(() => {
    router.get("/products/search", [controllers.SearchProducts]).use([searchProductsThrottle])
    router.get("/origins", [controllers.Origins, "list"])
    router.post("/simulator/parcel", [controllers.CalculateParcel]).use([calculateParcelThrottle])
    router.get("/simulator/templates", [controllers.GetTemplates]).use([getTemplatesThrottle])
  })
  .prefix("/v1/public")

// ─── Admin routes ───────────────────────────────────────────
router
  .group(() => {
    router.get("/categories/count", [controllers.Categories, "count"])
    router.get("/categories/stats", [controllers.Categories, "withStats"])

    router.get("/origins/count", [controllers.Origins, "count"])
    router.get("/origins/top", [controllers.Origins, "top"])

    router.get("/products/count", [controllers.Products, "count"])
    router.get("/products/recent", [controllers.Products, "recent"])
    router.get("/products/distribution", [controllers.Products, "distribution"])

    router.get("/territories/count", [controllers.Territories, "count"])
    router.get("/territories/top", [controllers.Territories, "top"])

    router.get("/transporters/count", [controllers.Transporters, "count"])
    router.get("/transporters/list", [controllers.Transporters, "list"])

    router.get("/flux", [controllers.Products, "listFlux"])
    router.get("/taxes", [controllers.Products, "listTaxes"])

    router
      .resource("categories", controllers.Categories)
      .use(["index", "store", "show", "update", "destroy"], middleware.auth())

    router
      .resource("origins", controllers.Origins)
      .use(["index", "store", "update", "destroy"], middleware.auth())

    router
      .resource("products", controllers.Products)
      .use(["index", "store", "show", "update", "destroy"], middleware.auth())

    router
      .resource("territories", controllers.Territories)
      .use(["index", "store", "show", "update", "destroy"], middleware.auth())

    router
      .resource("transporters", controllers.Transporters)
      .use(["index", "store", "show", "update", "destroy"], middleware.auth())

    router
      .get("/transporters/:transporterId/rules", [controllers.TransporterRules, "show"])
      .use([transporterRulesThrottle])
    router
      .post("/transporters/:transporterId/rules/flow", [controllers.TransporterRules, "saveFlow"])
      .use([transporterRulesThrottle])
    router
      .post("/transporters/:transporterId/rules/fees", [controllers.TransporterRules, "saveRules"])
      .use([transporterRulesThrottle])
    router
      .post("/transporters/:transporterId/rules", [controllers.TransporterRules, "saveAll"])
      .use([transporterRulesThrottle])
  })
  .use([middleware.auth()])
  .prefix("/v1/admin")
