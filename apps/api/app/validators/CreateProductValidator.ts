import vine from "@vinejs/vine"

const nomenclatureCodeRule = vine
  .string()
  .trim()
  .regex(/^\d{2,10}$/)
  .optional()

const taxOverrideRule = vine.number().positive().max(100).optional()

export const CreateProductValidator = vine.create(
  vine.object({
    productName: vine.string().trim().minLength(1).maxLength(255),
    categoryID: vine.string().uuid(),
    originID: vine.string().uuid(),
    territoryID: vine.string().uuid(),
    nomenclatureCode: nomenclatureCodeRule,
    tvaOverride: taxOverrideRule,
    omOverride: taxOverrideRule,
    omrOverride: taxOverrideRule,
  }),
)

export const UpdateProductValidator = vine.create(
  vine.object({
    productName: vine.string().trim().minLength(1).maxLength(255),
    categoryID: vine.string().uuid(),
    originID: vine.string().uuid(),
    territoryID: vine.string().uuid(),
    nomenclatureCode: nomenclatureCodeRule,
    tvaOverride: taxOverrideRule,
    omOverride: taxOverrideRule,
    omrOverride: taxOverrideRule,
  }),
)
