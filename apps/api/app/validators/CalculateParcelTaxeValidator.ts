import { OriginData, TerritoryData, TransporterData } from "@taxdom/types"
import vine from "@vinejs/vine"

const Origin = OriginData.map((o) => o.name)
const Territory = TerritoryData.map((t) => t.name)
const Transporter = TransporterData.map((t) => t.name)

export const CalculateParcelTaxeValidator = vine.compile(
  vine.object({
    customer: vine.enum(["Oui", "Non"]),
    deliveryPrice: vine.number().positive(),
    origin: vine.enum(Origin),
    products: vine.array(
      vine.object({
        name: vine.string().alphaNumeric(),
        price: vine.number().positive(),
      }),
    ),
    territory: vine.enum(Territory),
    transporter: vine.enum(Transporter),
  }),
)
