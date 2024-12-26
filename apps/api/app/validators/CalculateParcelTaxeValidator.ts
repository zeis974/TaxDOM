import { OriginData, TerritoryData } from "#types/index"
import vine from "@vinejs/vine"

export const CalculateParcelTaxeValidator = vine.compile(
  vine.object({
    products: vine.array(
      vine.object({
        name: vine.string().alphaNumeric(),
        price: vine.number().positive(),
      }),
    ),
    customer: vine.string().alphaNumeric(),
    deliveryPrice: vine.number().positive(),
    origin: vine.enum(OriginData),
    territory: vine.enum(TerritoryData),
    transporter: vine.string().alphaNumeric(),
  }),
)
