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
import { throttle } from "#start/limiter"
import { searchProductsNameThrottle, throttle } from "#start/limiter"

const GetProductTaxeController = () => import("#controllers/GetProductTaxeController")
const SearchProductsNameController = () => import("#controllers/SearchProductsNameController")

router
  .group(() => {
    router.post("/getProductTaxes", [GetProductTaxeController])
    router.get("/products/search", [SearchProductsNameController])
    router.post("/getProductTaxes", [GetProductTaxeController]).use([searchProductsNameThrottle])
  })
  .use([middleware.auth()])
  .use([throttle])
