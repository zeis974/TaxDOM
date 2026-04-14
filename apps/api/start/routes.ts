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

import registerAdminCategories from "#start/routes/admin/categories"
import registerAdminOrigins from "#start/routes/admin/origins"
import registerAdminProducts from "#start/routes/admin/products"
import registerAdminTerritories from "#start/routes/admin/territories"
import registerAdminTransporters from "#start/routes/admin/transporters"

import registerPublicOrigins from "#start/routes/public/origins"
import registerPublicProducts from "#start/routes/public/products"
import registerPublicSimulator from "#start/routes/public/simulator"

// ─── Public routes ───────────────────────────────────────
router
  .group(() => {
    registerPublicOrigins(router)
    registerPublicProducts(router)
    registerPublicSimulator(router)
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
