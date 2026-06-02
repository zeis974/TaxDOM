import type { HttpRouterService } from "@adonisjs/core/types"
import { controllers } from "#generated/controllers"

export default function registerAdminCustomsNomenclaturesRoutes(router: HttpRouterService) {
  const CustomsNomenclatures = controllers.CustomsNomenclatures

  router.get("/customs-nomenclatures/chapters", [CustomsNomenclatures, "chapters"])
  router.get("/customs-nomenclatures/tree", [CustomsNomenclatures, "tree"])
  router.get("/customs-nomenclatures/search", [CustomsNomenclatures, "search"])
  router.get("/customs-nomenclatures/:code/products", [CustomsNomenclatures, "products"])
  router.post("/customs-nomenclatures/sync", [CustomsNomenclatures, "triggerSync"])
  router.get("/customs-nomenclatures/sync/:runId/stream", [CustomsNomenclatures, "syncStream"])
}
