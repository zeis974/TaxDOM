import { OriginData, TerritoryData } from "@taxdom/types"
import vine from "@vinejs/vine"

const Origin = OriginData.map((o) => o.name)
const Territory = TerritoryData.map((t) => t.name)

export const GetProductTaxeValidator = vine.compile(
  vine.object({
    product: vine.string().trim().escape(),
    origin: vine.enum(Origin),
    territory: vine.enum(Territory),
  }),
)
