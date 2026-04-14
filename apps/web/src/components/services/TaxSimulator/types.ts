import { z } from "zod"

export const TaxSimulatorFormSchema = z.object({
  flux: z.enum(["import", "export"]),
  origin: z.string(),
  product: z.string(),
  territory: z.string(),
  "cf-turnstile-response": z.string(),
})

export type TaxSimulatorFormLabel = keyof z.infer<typeof TaxSimulatorFormSchema>
