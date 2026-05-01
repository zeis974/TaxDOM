import vine from "@vinejs/vine"

export const CreateProductValidator = vine.create(
  vine.object({
    productName: vine.string().trim().minLength(1).maxLength(255),
    categoryID: vine.string().uuid(),
    originID: vine.string().uuid(),
    territoryID: vine.string().uuid(),
  }),
)

export const UpdateProductValidator = vine.create(
  vine.object({
    productName: vine.string().trim().minLength(1).maxLength(255),
    categoryID: vine.string().uuid(),
    originID: vine.string().uuid(),
    territoryID: vine.string().uuid(),
    taxID: vine.string().uuid().optional(),
  }),
)
