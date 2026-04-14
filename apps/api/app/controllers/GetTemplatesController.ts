import { db } from "#config/database"
import logger from "@adonisjs/core/services/logger"

export default class GetTemplatesController {
  async handle() {
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
  }
}
