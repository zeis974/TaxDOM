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

router.get("/products/search", [controllers.SearchProducts]).use([searchProductsThrottle])

// Public endpoint to list origins (only names)
router.get("/origins", [controllers.Origins, "list"])

router.group(() => {
  // router.post("/products/taxes", [GetProductTaxeController]).use([getProductsTaxesThrottle])
  router.post("/simulator/parcel", [controllers.CalculateParcel]).use([calculateParcelThrottle])
  router.get("/simulator/templates", [controllers.GetTemplates]).use([getTemplatesThrottle])
})

// Dashboard protected routes
router
  .group(() => {
    router.get("/categories/count", [controllers.Categories, "count"]).use(middleware.auth())
    router.get("/categories/stats", [controllers.Categories, "withStats"]).use(middleware.auth())

    router.get("/origins/count", [controllers.Origins, "count"]).use(middleware.auth())
    router.get("/origins/top", [controllers.Origins, "top"]).use(middleware.auth())

    router.get("/products/count", [controllers.Products, "count"]).use(middleware.auth())
    router.get("/products/recent", [controllers.Products, "recent"]).use(middleware.auth())
    router
      .get("/products/distribution", [controllers.Products, "distribution"])
      .use(middleware.auth())

    router.get("/territories/count", [controllers.Territories, "count"]).use(middleware.auth())
    router.get("/territories/top", [controllers.Territories, "top"]).use(middleware.auth())

    router.get("/transporters/count", [controllers.Transporters, "count"]).use(middleware.auth())
    router.get("/transporters/list", [controllers.Transporters, "list"]).use(middleware.auth())

    router
      .get("/flux", [controllers.Products, "listFlux"])
      .use(middleware.auth({ verifySession: true }))
    router
      .get("/taxes", [controllers.Products, "listTaxes"])
      .use(middleware.auth({ verifySession: true }))

    router
      .resource("categories", controllers.Categories)
      .use(
        ["index", "store", "show", "update", "destroy"],
        middleware.auth({ verifySession: true }),
      )

    router
      .resource("origins", controllers.Origins)
      .use(["index", "store", "update", "destroy"], middleware.auth({ verifySession: true }))

    router
      .resource("products", controllers.Products)
      .use(
        ["index", "store", "show", "update", "destroy"],
        middleware.auth({ verifySession: true }),
      )

    router
      .resource("territories", controllers.Territories)
      .use(
        ["index", "store", "show", "update", "destroy"],
        middleware.auth({ verifySession: true }),
      )

    router
      .resource("transporters", controllers.Transporters)
      .use(
        ["index", "store", "show", "update", "destroy"],
        middleware.auth({ verifySession: true }),
      )

    // Transporter rules (flow and fee rules)
    router
      .get("/transporters/:transporterId/rules", [controllers.TransporterRules, "show"])
      .use(middleware.auth({ verifySession: true }))
      .use([transporterRulesThrottle])
    router
      .post("/transporters/:transporterId/rules/flow", [controllers.TransporterRules, "saveFlow"])
      .use(middleware.auth({ verifySession: true }))
      .use([transporterRulesThrottle])
    router
      .post("/transporters/:transporterId/rules/fees", [controllers.TransporterRules, "saveRules"])
      .use(middleware.auth({ verifySession: true }))
      .use([transporterRulesThrottle])
    router
      .post("/transporters/:transporterId/rules", [controllers.TransporterRules, "saveAll"])
      .use(middleware.auth({ verifySession: true }))
      .use([transporterRulesThrottle])
  })
  .prefix("/dashboard")
