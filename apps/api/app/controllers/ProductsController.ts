import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { BadRequestError } from "#exceptions/ServiceErrors"
// biome-ignore lint/style/useImportType: No import as type for controllers
import { ProductService } from "#services/ProductService"
import { CreateProductValidator, UpdateProductValidator } from "#validators/CreateProductValidator"

@inject()
export default class ProductsController {
  constructor(private productService: ProductService) {}

  async count() {
    return await this.productService.count()
  }

  async recent() {
    return await this.productService.findRecent()
  }

  async distribution() {
    return await this.productService.findDistributionByCategory()
  }

  async listTaxes() {
    return await this.productService.findAllTaxes()
  }

  async index({ request }: HttpContext) {
    const page = Math.max(1, request.input("page", 1))
    const limit = Math.min(Math.max(1, request.input("limit", 20)), 100)
    return await this.productService.findAllPaginated(page, limit)
  }

  async store({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(CreateProductValidator)
    const product = await this.productService.create(validatedData)
    logger.info(`Created product ${product.productID} successfully`)
    return response.created(product)
  }

  async show({ params }: HttpContext) {
    const productId: string = params.id
    if (!productId || typeof productId !== "string") {
      throw new BadRequestError("ID de produit invalide")
    }
    const product = await this.productService.findById(productId)
    logger.info(`Fetched product ${productId} successfully`)
    return product
  }

  async update({ params, request }: HttpContext) {
    const productId: string = params.id
    if (!productId) {
      throw new BadRequestError("ID de produit invalide")
    }
    const validatedData = await request.validateUsing(UpdateProductValidator)
    const product = await this.productService.update(productId, validatedData)
    logger.info(`Updated product ${productId} successfully`)
    return product
  }

  async destroy({ params, response }: HttpContext) {
    const productId: string = params.id
    if (!productId) {
      throw new BadRequestError("ID de produit invalide")
    }
    await this.productService.delete(productId)
    logger.info(`Deleted product ${productId} successfully`)
    return response.ok({ message: "Produit supprimé avec succès" })
  }
}
