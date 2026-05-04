import logger from "@adonisjs/core/services/logger"
import { db } from "#config/database"
import { InternalServerError } from "#exceptions/ServiceErrors"

export default class GetTemplatesController {
  async handle() {
    try {
      const allTemplatesWithProducts = await db.query.templates.findMany({
        with: {
          templateProducts: {
            with: {
              product: {
                columns: {
                  productID: true,
                  productName: true,
                },
              },
            },
          },
        },
      })

      const formatted = allTemplatesWithProducts.map((template) => ({
        templateID: template.templateID,
        templateName: template.templateName,
        products: template.templateProducts.map((p) => p.product),
      }))

      logger.info("Get all templates")

      return formatted
    } catch (err) {
      logger.error({ err }, "Failed to get templates")
      throw new InternalServerError("Erreur lors de la récupération des templates")
    }
  }
}
