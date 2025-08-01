import vine from "@vinejs/vine"

export const AddProductValidator = vine.compile(
  vine.object({
    productName: vine.string().trim().minLength(1).maxLength(255),
    categoryID: vine.number().positive(),
    originID: vine.number().positive(),
    territoryID: vine.number().positive(),
    fluxID: vine.number().positive(),
    taxID: vine.number().positive(),
  }),
)
