export const TransporterData = [
  { name: "CHRONOPOST", available: true },
  { name: "COLISSIMO", available: true },
  { name: "DHL", available: false },
  { name: "FEDEX", available: false },
] as const

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
