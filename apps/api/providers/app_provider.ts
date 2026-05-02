import type { ApplicationService } from "@adonisjs/core/types"

import { db } from "#config/database"
import { ProductService } from "#services/ProductService"

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(ProductService, () => {
      return new ProductService(db)
    })
  }
}
