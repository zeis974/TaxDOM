import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import type { ParcelCalculationService } from "#services/ParcelCalculationService"
import { CalculateParcelTaxeValidator } from "#validators/CalculateParcelTaxeValidator"

@inject()
export default class CalculateParcelController {
  constructor(private parcelCalculationService: ParcelCalculationService) {}

  async handle({ request }: HttpContext) {
    const payload = await request.validateUsing(CalculateParcelTaxeValidator)
    const result = await this.parcelCalculationService.calculate(payload)
    return result
  }
}
