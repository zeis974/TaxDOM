import { z } from "zod"

export const TaxSimulatorFormSchema = z.object({
  origin: z.string(),
  query: z.string(),
  territory: z.string(),
  "cf-turnstile-response": z.string().min(1, "Captcha manquant"),
})

export type TaxSimulatorFormLabel = keyof z.infer<typeof TaxSimulatorFormSchema>
