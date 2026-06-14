import vine from "@vinejs/vine"

export const ResolveProductTaxesValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(200).optional(),
    url: vine.string().trim().url().maxLength(2048).optional(),
    origin: vine.string().trim().maxLength(255),
    territory: vine.string().trim().maxLength(255),
  }),
)
