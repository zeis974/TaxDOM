export const TaxSimulatorTerritoryData = new Set([
  "CORSE", // Corse
  "FRANCE", // France continentale
  "GUADELOUPE", // Guadeloupe
  "GUYANE", // Guyane française
  "MARTINIQUE", // Martinique
  "MAYOTTE", // Mayotte
  "REUNION", // Réunion
] as const) 

export const TaxSimulatorOriginData = new Set(["EU", "HORS_EU"] as const)
