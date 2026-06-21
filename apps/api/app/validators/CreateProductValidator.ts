import vine from "@vinejs/vine"

const nomenclatureCodeRule = vine
  .string()
  .trim()
  .regex(/^\d{2,10}$/)
  .optional()

export const CreateProductValidator = vine.create(
  vine.object({
    productName: vine.string().trim().minLength(1).maxLength(255),
    categoryID: vine.string().uuid(),
    originID: vine.string().uuid(),
    territoryID: vine.string().uuid(),
    nomenclatureCode: nomenclatureCodeRule,
  }),
)

export const UpdateProductValidator = vine.create(
  vine.object({
    productName: vine.string().trim().minLength(1).maxLength(255),
    categoryID: vine.string().uuid(),
    originID: vine.string().uuid(),
    territoryID: vine.string().uuid(),
    nomenclatureCode: nomenclatureCodeRule,
  }),
)
