/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router"

const GetProductTaxeController = () => import("#controllers/GetProductTaxeController")

router.group(() => {
  router.post("/getProductTaxes", [GetProductTaxeController])
})
