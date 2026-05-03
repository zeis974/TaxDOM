import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import logger from "@adonisjs/core/services/logger"
import { BadRequestError } from "#exceptions/ServiceErrors"
import type { CategoryService } from "#services/CategoryService"
import { CreateCategoryValidator, UpdateCategoryValidator } from "#validators/CategoryValidator"

@inject()
export default class CategoriesController {
  constructor(private categoryService: CategoryService) {}

  async count() {
    return await this.categoryService.count()
  }

  async withStats() {
    return await this.categoryService.findAllWithStats()
  }

  async index() {
    return await this.categoryService.findAll()
  }

  async store({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(CreateCategoryValidator)
    const category = await this.categoryService.create(validatedData)
    logger.info(`Created category ${category.categoryID} successfully`)
    return response.created(category)
  }

  async show({ params }: HttpContext) {
    const categoryId: string = params.id
    if (!categoryId || typeof categoryId !== "string") {
      throw new BadRequestError("Invalid category ID")
    }
    const category = await this.categoryService.findById(categoryId)
    logger.info(`Fetched category ${categoryId} successfully`)
    return category
  }

  async update({ params, request }: HttpContext) {
    const categoryId: string = params.id
    if (!categoryId) {
      throw new BadRequestError("Invalid category ID")
    }
    const validatedData = await request.validateUsing(UpdateCategoryValidator)
    const category = await this.categoryService.update(categoryId, validatedData)
    logger.info(`Updated category ${categoryId} successfully`)
    return category
  }

  async destroy({ params, response }: HttpContext) {
    const categoryId: string = params.id
    if (!categoryId) {
      throw new BadRequestError("Invalid category ID")
    }
    await this.categoryService.delete(categoryId)
    logger.info(`Deleted category ${categoryId} successfully`)
    return response.ok({ message: "Category deleted successfully" })
  }
}
