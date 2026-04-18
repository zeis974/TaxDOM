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

import registerAdminCategories from "#routes/admin/categories"
import registerAdminOrigins from "#routes/admin/origins"
import registerAdminProducts from "#routes/admin/products"
import registerAdminTerritories from "#routes/admin/territories"
import registerAdminTransporters from "#routes/admin/transporters"

import registerPublicOrigins from "#routes/public/origins"
import registerPublicProducts from "#routes/public/products"
import registerPublicSimulator from "#routes/public/simulator"
import registerPublicTerritories from "#routes/public/territories"
import registerPublicTransporters from "#routes/public/transporters"

// ─── Public routes ───────────────────────────────────────
router
  .group(() => {
    registerPublicOrigins(router)
    registerPublicProducts(router)
    registerPublicSimulator(router)
    registerPublicTerritories(router)
    registerPublicTransporters(router)
  })
  .prefix("/v1/public")

// ─── Admin routes ────────────────────────────────────────
router
  .group(() => {
    registerAdminCategories(router)
    registerAdminOrigins(router)
    registerAdminProducts(router)
    registerAdminTerritories(router)
    registerAdminTransporters(router)
  })
  .use([middleware.auth()])
  .prefix("/v1/admin")
