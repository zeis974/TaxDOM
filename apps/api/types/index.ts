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

export type TaxSimulatorFormLabel = "product" | "origin" | "territory" | "flux"

export type ParcelSimulatorFormLabel = "origin" | "products" | "territory" | "customer"
