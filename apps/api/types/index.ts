export type Territory =
  | "CORSE" // Corse
  | "FRANCE" // France continentale
  | "GUADELOUPE" // Guadeloupe
  | "GUYANE" // Guyane française
  | "MARTINIQUE" // Martinique
  | "MAYOTTE" // Mayotte
  | "REUNION" // Réunion

export type Origin =
  | "EU" // Union européenne
  | "HORS_EU" // Hors Union européenne

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
