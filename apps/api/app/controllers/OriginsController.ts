import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import { BadRequestError } from "#exceptions/ServiceErrors"
import type { OriginService } from "#services/OriginService"
import { createOriginValidator, updateOriginValidator } from "#validators/OriginValidator"

@inject()
export default class OriginsController {
  constructor(private originService: OriginService) {}

  async count() {
    return await this.originService.count()
  }

  async list() {
    return await this.originService.findPublicList()
  }

  async index() {
    return await this.originService.findAllWithProductCount()
  }

  async top() {
    return await this.originService.findTopByProductCount()
  }

  async store({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createOriginValidator)
    const origin = await this.originService.create(validatedData)
    return response.status(201).json({ message: "Origine créée avec succès", origin })
  }

  async update({ params, request, response }: HttpContext) {
    const originIdParam: string = params.id
    if (!originIdParam) {
      throw new BadRequestError("Paramètre manquant")
    }
    const validatedData = await request.validateUsing(updateOriginValidator)
    const origin = await this.originService.update(originIdParam, validatedData)
    return response.status(200).json({ message: "Origine mise à jour", origin })
  }

  async destroy({ params, response }: HttpContext) {
    const originIdParam: string = params.id
    if (!originIdParam) {
      throw new BadRequestError("Paramètre manquant")
    }
    await this.originService.delete(originIdParam)
    return response.status(200).json({ message: "Origine supprimée" })
  }
}
