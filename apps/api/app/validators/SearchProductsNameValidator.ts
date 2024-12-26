import vine from "@vinejs/vine"

export const SearchProductsNameValidator = vine.compile(
  vine.object({
    name: vine.string().alphaNumeric(),
  }),
)
