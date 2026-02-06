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
  transporterRulesThrottle,
} from "#start/limiter"

const CategoriesController = () => import("#controllers/CategoriesController")
const OriginsController = () => import("#controllers/OriginsController")
const CalculateParcelController = () => import("#controllers/CalculateParcelController")
const GetTemplatesController = () => import("#controllers/GetTemplatesController")
const SearchProductsController = () => import("#controllers/SearchProductsController")
const ProductsController = () => import("#controllers/ProductsController")
const TerritoriesController = () => import("#controllers/TerritoriesController")
const TransportersController = () => import("#controllers/TransportersController")
const TransporterRulesController = () => import("#controllers/TransporterRulesController")

router.get("/products/search", [SearchProductsController])

// Public endpoint to list origins (only names)
router.get("/origins", [OriginsController, "list"])

router.group(() => {
  // router.post("/products/taxes", [GetProductTaxeController]).use([getProductsTaxesThrottle])
  router.post("/simulator/parcel", [CalculateParcelController]).use([calculateParcelThrottle])
  router.get("/simulator/templates", [GetTemplatesController]).use([getTemplatesThrottle])
})

// Dashboard protected routes
router
  .group(() => {
    router.get("/categories/count", [CategoriesController, "count"]).use(middleware.auth())
    router.get("/categories/stats", [CategoriesController, "withStats"]).use(middleware.auth())

    router.get("/origins/count", [OriginsController, "count"]).use(middleware.auth())
    router.get("/origins/top", [OriginsController, "top"]).use(middleware.auth())

    router.get("/products/count", [ProductsController, "count"]).use(middleware.auth())
    router.get("/products/recent", [ProductsController, "recent"]).use(middleware.auth())
    router
      .get("/products/distribution", [ProductsController, "distribution"])
      .use(middleware.auth())

    router.get("/territories/count", [TerritoriesController, "count"]).use(middleware.auth())
    router.get("/territories/top", [TerritoriesController, "top"]).use(middleware.auth())

    router.get("/transporters/count", [TransportersController, "count"]).use(middleware.auth())
    router.get("/transporters/list", [TransportersController, "list"]).use(middleware.auth())

    router
      .resource("categories", CategoriesController)
      .use(
        ["index", "store", "show", "update", "destroy"],
        middleware.auth({ verifySession: true }),
      )

    router
      .resource("origins", OriginsController)
      .use(["index", "store", "update", "destroy"], middleware.auth({ verifySession: true }))

    router
      .resource("products", ProductsController)
      .use(
        ["index", "store", "show", "update", "destroy"],
        middleware.auth({ verifySession: true }),
      )

    router
      .resource("territories", TerritoriesController)
      .use(
        ["index", "store", "show", "update", "destroy"],
        middleware.auth({ verifySession: true }),
      )

    router
      .resource("transporters", TransportersController)
      .use(
        ["index", "store", "show", "update", "destroy"],
        middleware.auth({ verifySession: true }),
      )

    // Transporter rules (flow and fee rules)
    router
      .get("/transporters/:transporterId/rules", [TransporterRulesController, "show"])
      .use(middleware.auth({ verifySession: true }))
      .use([transporterRulesThrottle])
    router
      .post("/transporters/:transporterId/rules/flow", [TransporterRulesController, "saveFlow"])
      .use(middleware.auth({ verifySession: true }))
      .use([transporterRulesThrottle])
    router
      .post("/transporters/:transporterId/rules/fees", [TransporterRulesController, "saveRules"])
      .use(middleware.auth({ verifySession: true }))
      .use([transporterRulesThrottle])
    router
      .post("/transporters/:transporterId/rules", [TransporterRulesController, "saveAll"])
      .use(middleware.auth({ verifySession: true }))
      .use([transporterRulesThrottle])
  })
  .prefix("/dashboard")
