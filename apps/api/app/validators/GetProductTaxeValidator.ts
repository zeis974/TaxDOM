import vine from "@vinejs/vine"

export const GetProductTaxeValidator = vine.create(
  vine.object({
    product: vine.string().trim().escape(),
    origin: vine.string(),
    territory: vine.string(),
  }),
)
