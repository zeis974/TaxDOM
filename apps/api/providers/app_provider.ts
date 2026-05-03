import type { ApplicationService } from "@adonisjs/core/types"

import { db } from "#config/database"
import { CategoryService } from "#services/CategoryService"
import { OriginService } from "#services/OriginService"
import { ParcelCalculationService } from "#services/ParcelCalculationService"
import { ProductService } from "#services/ProductService"
import { TerritoryService } from "#services/TerritoryService"
import { TransporterRulesService } from "#services/TransporterRulesService"
import { TransporterService } from "#services/TransporterService"

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(ProductService, () => {
      return new ProductService(db)
    })

    this.app.container.singleton(CategoryService, () => {
      return new CategoryService(db)
    })

    this.app.container.singleton(TransporterRulesService, () => {
      return new TransporterRulesService(db)
    })

    this.app.container.singleton(ParcelCalculationService, () => {
      return new ParcelCalculationService(db)
    })

    this.app.container.singleton(OriginService, () => {
      return new OriginService(db)
    })

    this.app.container.singleton(TerritoryService, () => {
      return new TerritoryService(db)
    })

    this.app.container.singleton(TransporterService, () => {
      return new TransporterService(db)
    })
  }
}
