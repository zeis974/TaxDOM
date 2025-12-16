import { z } from "zod"

import type { ParcelSimulatorFormLabel } from "@/components/services/ParcelSimulator/types"
import type { TaxSimulatorFormLabel } from "@/components/services/TaxSimulator/types"

export type FormLabel = ParcelSimulatorFormLabel | TaxSimulatorFormLabel

const CheckboxSchema = z.object({
  label: z.string(),
  name: z.custom<FormLabel>(),
  disabled: z.boolean().optional(),
})

export type CheckboxProps = z.infer<typeof CheckboxSchema>

const InputSchema = z.object({
  label: z.string(),
  name: z.custom<FormLabel>(),
  type: z.enum(["text", "number"]).optional(),
  placeholder: z.string(),
  disabled: z.boolean(),
})

export type InputProps = z.infer<typeof InputSchema>

const RadioSchema = z.object({
  label: z.string(),
  name: z.custom<FormLabel>(),
  options: z.array(z.string()),
  disabled: z.boolean().optional(),
})

export type RadioProps = z.infer<typeof RadioSchema>

const SelectSchema = z.object({
  label: z.string(),
  name: z.custom<FormLabel>(),
  placeholder: z.string(),
  options: z
    .array(
      z.object({
        name: z.string(),
        available: z.boolean().optional(),
        value: z.string().optional(),
      }),
    )
    .optional(),
  dynamic: z.string().optional(),
  loading: z.boolean().optional(),
})

export type SelectProps = z.infer<typeof SelectSchema>
