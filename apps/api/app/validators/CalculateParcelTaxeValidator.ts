import vine from "@vinejs/vine"

export const CalculateParcelTaxeValidator = vine.create(
  vine.object({
    customer: vine.enum(["Oui", "Non"]),
    deliveryPrice: vine.number().positive(),
    origin: vine.string(),
    products: vine.array(
      vine.object({
        name: vine.string().alphaNumeric(),
        price: vine.number().positive(),
      }),
    ),
    territory: vine.string(),
    transporter: vine.string(),
  }),
)
