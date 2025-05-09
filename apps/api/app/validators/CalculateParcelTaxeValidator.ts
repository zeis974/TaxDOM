import { OriginData, TerritoryData } from "#types/index"
import vine from "@vinejs/vine"

export const CalculateParcelTaxeValidator = vine.compile(
  vine.object({
    customer: vine.enum(["Oui", "Non"]),
    deliveryPrice: vine.number().positive(),
    origin: vine.enum(OriginData),
    products: vine.array(
      vine.object({
        name: vine.string().alphaNumeric(),
        price: vine.number().positive(),
      }),
    ),
    territory: vine.enum(TerritoryData),
    transporter: vine.string().alphaNumeric(),
  }),
)
