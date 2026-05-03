import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import { BadRequestError } from "#exceptions/ServiceErrors"
import type { TerritoryService } from "#services/TerritoryService"
import { createTerritoryValidator, updateTerritoryValidator } from "#validators/TerritoryValidator"

@inject()
export default class TerritoriesController {
  constructor(private territoryService: TerritoryService) {}

  async count() {
    return await this.territoryService.count()
  }

  async list() {
    return await this.territoryService.findPublicList()
  }

  async index() {
    return await this.territoryService.findAllWithProductCount()
  }

  async top() {
    return await this.territoryService.findTopByProductCount()
  }

  async show({ response }: HttpContext) {
    return response.status(404)
  }

  async store({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createTerritoryValidator)
    const territory = await this.territoryService.create(validatedData)
    return response.status(201).json({ message: "Territoire créé avec succès", territory })
  }

  async update({ params, request, response }: HttpContext) {
    const territoryIdParam: string = params.id
    if (!territoryIdParam) {
      throw new BadRequestError("Paramètre manquant")
    }
    const validatedData = await request.validateUsing(updateTerritoryValidator)
    const territory = await this.territoryService.update(territoryIdParam, validatedData)
    return response.status(200).json({ message: "Territoire mis à jour", territory })
  }

  async destroy({ params, response }: HttpContext) {
    const territoryIdParam: string = params.id
    if (!territoryIdParam) {
      throw new BadRequestError("Paramètre manquant")
    }
    await this.territoryService.delete(territoryIdParam)
    return response.status(200).json({ message: "Territoire supprimé" })
  }
}
