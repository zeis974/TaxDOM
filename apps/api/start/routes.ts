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
import { getProductsTaxesThrottle, searchProductsNameThrottle } from "#start/limiter"

const GetProductTaxeController = () => import("#controllers/GetProductTaxeController")
const SearchProductsNameController = () => import("#controllers/SearchProductsNameController")

router
  .group(() => {
    router.get("/products/search", [SearchProductsNameController]).use([searchProductsNameThrottle])
    router.post("/products/taxes", [GetProductTaxeController]).use([getProductsTaxesThrottle])
  })
  .use([middleware.auth()])
