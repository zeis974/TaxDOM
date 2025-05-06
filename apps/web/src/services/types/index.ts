import { z } from "zod"

const OriginSchema = z.enum(["EU", "HORS_EU"])
export type Origin = z.infer<typeof OriginSchema>

const TerritorySchema = z.enum([
  "CORSE",
  "FRANCE",
  "GUADELOUPE",
  "GUYANE",
  "MARTINIQUE",
  "MAYOTTE",
  "REUNION",
])
export type Territory = z.infer<typeof TerritorySchema>

const TransporterSchema = z.enum(["CHRONOPOST", "COLISSIMO", "DHL", "FEDEX", "UPS"])
export type Transporter = z.infer<typeof TransporterSchema>
