import type { Origin, Territory } from "@taxdom/types"

import { z } from "zod"

export const TaxSimulatorFormSchema = z.object({
  flux: z.enum(["import", "export"]),
  origin: z.custom<Origin>(),
  product: z.string(),
  territory: z.custom<Territory>(),
  "cf-turnstile-response": z.string(),
})

export type TaxSimulatorFormValues = z.infer<typeof TaxSimulatorFormSchema>

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends Array<infer U>
        ? `${K}[${number}]` | `${K}[${number}].${DeepKeys<U>}`
        : T[K] extends object
          ? `${K}` | `${K}.${DeepKeys<T[K]>}`
          : `${K}`
    }[keyof T & (string | number)]
  : never

export type TaxSimulatorFormLabel = DeepKeys<z.infer<typeof TaxSimulatorFormSchema>>
