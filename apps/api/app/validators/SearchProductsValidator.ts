import vine from "@vinejs/vine"

export const SearchProductsValidator = vine.compile(
  vine.object({
    name: vine.string().alphaNumeric(),
  }),
)
