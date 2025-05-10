import type { Origin, Territory } from "@taxdom/types"

export interface TaxSimulatorFormLabel {
  product: string
  origin: Origin
  territory: Territory
  flux: "import" | "export"
}

export interface ParcelSimulatorFormLabel {
  customer: string
  deliveryPrice: number | undefined
  origin: Origin
  territory: Territory
  products: Array<{
    name: string
    price: number | undefined
  }>
}
