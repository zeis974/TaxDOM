import vine from "@vinejs/vine"

export const CalculateParcelTaxeValidator = vine.compile(
  vine.object({
    products: vine.array(
      vine.object({
        name: vine.string().alphaNumeric(),
        price: vine.number().positive(),
      }),
    ),
    origin: vine.string().alphaNumeric(),
    territory: vine.string().alphaNumeric(),
  }),
)
