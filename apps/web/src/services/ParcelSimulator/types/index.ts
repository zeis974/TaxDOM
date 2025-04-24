import type { Origin, Territory, Transporter } from "@/services/types"

import { z } from "zod"

export const ParcelSimulatorSchema = z.object({
  customer: z.enum(["Oui", "Non"]),
  deliveryPrice: z.coerce.number().min(0),
  products: z.array(
    z.object({
      name: z.string(),
      price: z.coerce.number().min(0),
    }),
  ),
  origin: z.custom<Origin>(),
  territory: z.custom<Territory>(),
  transporter: z.custom<Transporter>(),
  "cf-turnstile-response": z.string(),
})

export type ParcelSimulatorFormValues = z.infer<typeof ParcelSimulatorSchema>

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends Array<infer U>
        ? `${K}[${number}]` | `${K}[${number}].${DeepKeys<U>}`
        : T[K] extends object
          ? `${K}` | `${K}.${DeepKeys<T[K]>}`
          : `${K}`
    }[keyof T & (string | number)]
  : never

export type ParcelSimulatorFormLabel = DeepKeys<z.infer<typeof ParcelSimulatorSchema>>

const ParcelSimulatorResultSchema = z.object({
  carrierFee: z.number(),
  dutyPrice: z.number(),
  totalTaxes: z.number(),
  taxes: z.object({
    tva: z.number(),
    om: z.number(),
    omr: z.number(),
  }),
  taxesInfo: z.object({
    applicable: z.boolean(),
    privateCustomer: z.boolean(),
  }),
  products: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
    }),
  ),
})

export type ParcelSimulatorResult = z.infer<typeof ParcelSimulatorResultSchema>
