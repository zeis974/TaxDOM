export const TerritoryData = [
  "CORSE",
  "FRANCE",
  "GUADELOUPE",
  "GUYANE",
  "MARTINIQUE",
  "MAYOTTE",
  "REUNION",
] as const

export type Territory = (typeof TerritoryData)[number]

export const OriginData = ["EU", "HORS_EU"] as const

export type Origin = (typeof OriginData)[number]

export interface TaxSimulatorFormLabel extends Record<string, any> {
  product: string
  origin: Origin
  territory: Territory
  flux: "import" | "export"
}

export interface ParcelSimulatorFormLabel extends Record<string, any> {
  customer: string
  origin: string
  products: Array<{
    name: string
    price: number | undefined
  }>
  deliveryPrice: number | undefined
  territory: string
}
