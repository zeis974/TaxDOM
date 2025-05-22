export const OriginData = [
  { name: "EU", available: true },
  { name: "HORS_EU", available: true },
] as const

export const TerritoryData = [
  { name: "CORSE", available: false },
  { name: "FRANCE", available: false },
  { name: "GUADELOUPE", available: false },
  { name: "GUYANE", available: false },
  { name: "MARTINIQUE", available: false },
  { name: "MAYOTTE", available: false },
  { name: "REUNION", available: true },
] as const

export const TransporterData = [
  { name: "CHRONOPOST", available: true },
  { name: "COLISSIMO", available: true },
  { name: "DHL", available: false },
  { name: "FEDEX", available: false },
] as const

export type Origin = (typeof OriginData)[number]["name"]
export type Territory = (typeof TerritoryData)[number]["name"]
export type Transporter = (typeof TransporterData)[number]["name"]

export type TaxSimulatorResult = {
  product: string
  taxes: {
    tva: number
    om: number
    omr: number
  }
}

export type ParcelSimulatorResult = {
  carrierFee: number
  dutyPrice: number
  totalTaxes: number
  taxes: {
    applicable: "yes" | "no" | "maybe"
    om: number
    omr: number
    tva: number
  }
  products: {
    name: string
    price: number
  }[]
}
