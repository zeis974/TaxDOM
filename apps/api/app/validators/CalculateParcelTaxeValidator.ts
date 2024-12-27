import vine from "@vinejs/vine"

export const CalculateParcelTaxeValidator = vine.compile(
  vine.object({
    customer: vine.string().alphaNumeric(),
    deliveryPrice: vine.number().positive(),
    origin: vine.string().alphaNumeric(),

    products: vine.array(
      vine.object({
        name: vine.string().alphaNumeric(),
        price: vine.number().positive(),
      }),
    ),
    territory: vine.string().alphaNumeric(),
    transporter: vine.string().alphaNumeric(),
  }),
)
