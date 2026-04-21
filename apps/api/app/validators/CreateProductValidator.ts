import vine from "@vinejs/vine"

export const CreateProductValidator = vine.create(
  vine.object({
    productName: vine.string().trim().minLength(1).maxLength(255),
    categoryID: vine.string().trim().minLength(1),
    originID: vine.string().trim().minLength(1),
    territoryID: vine.string().trim().minLength(1),
    taxID: vine.string().trim().minLength(1).optional(),
  }),
)

export const UpdateProductValidator = vine.create(
  vine.object({
    productName: vine.string().trim().minLength(1).maxLength(255),
    categoryID: vine.string().trim().minLength(1),
    originID: vine.string().trim().minLength(1),
    territoryID: vine.string().trim().minLength(1),
    taxID: vine.string().trim().minLength(1).optional(),
  }),
)
