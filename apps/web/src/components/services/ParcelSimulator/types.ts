import type { Transporter } from "@taxdom/types"

import { z } from "zod"

export const ParcelSimulatorSchema = z.object({
  customer: z.enum(["Oui", "Non"]),
  deliveryPrice: z.coerce.number().min(0),
  enterprise: z.boolean().optional(),
  origin: z.string(),
  products: z.array(
    z.object({
      name: z.string(),
      price: z.coerce.number().min(0),
    }),
  ),
  taxPaid: z.boolean(),
  territory: z.string(),
  transporter: z.custom<Transporter>(),
  "cf-turnstile-response": z.string(),
})

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends Array<any>
        ? `${K}` | `${K}[${number}]` | `${K}[${number}].${DeepKeys<T[K][number]>}`
        : T[K] extends object
          ? `${K}` | `${K}.${DeepKeys<T[K]>}`
          : `${K}`
    }[keyof T & (string | number)]
  : never

export type ParcelSimulatorFormLabel = DeepKeys<z.infer<typeof ParcelSimulatorSchema>>

const ParcelSimulatorTemplateSchema = z.array(
  z.object({
    templateID: z.number(),
    templateName: z.string(),
    products: z.array(
      z.object({
        productID: z.number(),
        productName: z.string(),
      }),
    ),
  }),
)
export type ParcelSimulatorTemplateType = z.infer<typeof ParcelSimulatorTemplateSchema>
