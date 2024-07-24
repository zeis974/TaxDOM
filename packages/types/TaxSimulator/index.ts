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

export interface TaxSimulatorFormValues {
  product: string
  origin: Origin
  territory: Territory
  flux: "import" | "export"
}

export type TaxSimulatorFormLabel = keyof TaxSimulatorFormValues
