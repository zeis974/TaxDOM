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
  getProductsTaxesThrottle,
  getTemplatesThrottle,
  searchProductsNameThrottle,
} from "#start/limiter"

const AuthController = () => import("#controllers/AuthController")
const CalculateParcelController = () => import("#controllers/CalculateParcelController")
const GetTemplatesController = () => import("#controllers/GetTemplatesController")
const GetProductTaxeController = () => import("#controllers/GetProductTaxeController")
const SearchProductsNameController = () => import("#controllers/SearchProductsNameController")

router
  .group(() => {
    router.get("/products/search", [SearchProductsNameController]).use([searchProductsNameThrottle])
    router.post("/products/taxes", [GetProductTaxeController]).use([getProductsTaxesThrottle])
    router.post("/simulator/parcel", [CalculateParcelController]).use([calculateParcelThrottle])
    router.get("/simulator/templates", [GetTemplatesController]).use([getTemplatesThrottle])
  })
  .use([middleware.auth(), middleware.bodyparser()])

router.any("/auth/*", [AuthController])
