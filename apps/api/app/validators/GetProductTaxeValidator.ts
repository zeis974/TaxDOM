import { OriginData, TerritoryData } from "#types/index"
import vine from "@vinejs/vine"

export const GetProductTaxeValidator = vine.compile(
  vine.object({
    product: vine.string().trim().escape(),
    origin: vine.enum(OriginData),
    territory: vine.enum(TerritoryData),
  }),
)
