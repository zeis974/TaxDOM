import vine from "@vinejs/vine"

export const GetProductTaxeValidator = vine.create(
  vine.object({
    product: vine.string().trim().escape().maxLength(255),
    origin: vine.string().trim().maxLength(255),
    territory: vine.string().trim().maxLength(255),
  }),
)
