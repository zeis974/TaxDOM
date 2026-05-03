import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import { BadRequestError } from "#exceptions/ServiceErrors"
import type { TransporterService } from "#services/TransporterService"
import {
  CreateTransporterValidator,
  UpdateTransporterValidator,
} from "#validators/TransporterValidator"

@inject()
export default class TransportersController {
  constructor(private transporterService: TransporterService) {}

  async count() {
    return await this.transporterService.count()
  }

  async list() {
    return await this.transporterService.findPublicList()
  }

  async index() {
    return await this.transporterService.findAll()
  }

  async show({ params }: HttpContext) {
    const { id } = params
    if (!id) {
      throw new BadRequestError("ID du transporteur requis")
    }
    return await this.transporterService.findById(id)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(CreateTransporterValidator)
    const transporter = await this.transporterService.create(payload)
    return response.status(201).json({ message: "Transporteur créé avec succès", transporter })
  }

  async update({ params, request }: HttpContext) {
    const { id } = params
    if (!id) {
      throw new BadRequestError("ID du transporteur requis")
    }
    const payload = await request.validateUsing(UpdateTransporterValidator)
    const transporter = await this.transporterService.update(id, payload)
    return { message: "Transporteur mis à jour", transporter }
  }

  async destroy({ params }: HttpContext) {
    const { id } = params
    if (!id) {
      throw new BadRequestError("ID du transporteur requis")
    }
    await this.transporterService.delete(id)
    return { message: "Transporteur supprimé" }
  }
}
