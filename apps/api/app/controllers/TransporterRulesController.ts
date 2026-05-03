import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { BadRequestError } from "#exceptions/ServiceErrors"
import type { TransporterRulesService } from "#services/TransporterRulesService"
import {
  saveAllValidator,
  saveFlowValidator,
  saveRulesValidator,
} from "#validators/TransporterRulesValidator"

const UUID_V7_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function validateTransporterId(transporterId: unknown): transporterId is string {
  return (
    typeof transporterId === "string" &&
    transporterId.length > 0 &&
    UUID_V7_REGEX.test(transporterId)
  )
}

@inject()
export default class TransporterRulesController {
  constructor(private transporterRulesService: TransporterRulesService) {}

  async show({ params }: HttpContext) {
    const { transporterId } = params
    if (!validateTransporterId(transporterId)) {
      throw new BadRequestError("ID du transporteur invalide (UUIDv7)")
    }
    const result = await this.transporterRulesService.findByTransporterId(transporterId)
    return result
  }

  async saveFlow({ params, request }: HttpContext) {
    const { transporterId } = params
    if (!validateTransporterId(transporterId)) {
      throw new BadRequestError("ID du transporteur invalide (UUIDv7)")
    }
    const parsed = await request.validateUsing(saveFlowValidator)
    await this.transporterRulesService.saveFlow(transporterId, parsed.nodes, parsed.edges)
    logger.info({ transporterId }, "[DASHBOARD]: Saved transporter flow")
    return { message: "Flow sauvegardé avec succès" }
  }

  async saveRules({ params, request }: HttpContext) {
    const { transporterId } = params
    if (!validateTransporterId(transporterId)) {
      throw new BadRequestError("ID du transporteur invalide (UUIDv7)")
    }
    const parsed = await request.validateUsing(saveRulesValidator)
    await this.transporterRulesService.saveRules(transporterId, parsed.rules)
    logger.info({ transporterId }, "[DASHBOARD]: Saved transporter rules")
    return { message: "Règles sauvegardées avec succès" }
  }

  async saveAll({ params, request }: HttpContext) {
    const { transporterId } = params
    if (!validateTransporterId(transporterId)) {
      throw new BadRequestError("ID du transporteur invalide (UUIDv7)")
    }
    const parsed = await request.validateUsing(saveAllValidator)
    await this.transporterRulesService.saveAll(
      transporterId,
      parsed.nodes,
      parsed.edges,
      parsed.rules,
    )
    logger.info({ transporterId }, "[DASHBOARD]: Saved transporter flow and rules")
    return { message: "Flow et règles sauvegardés avec succès" }
  }
}
