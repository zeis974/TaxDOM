import type { FieldApi } from "@tanstack/react-form"

import type { ParcelSimulatorFormLabel } from "@/components/services/ParcelSimulator/types"
import type { TaxSimulatorFormLabel } from "@/components/services/TaxSimulator/types"

import { z } from "zod"

const InputSchema = z.object({
  label: z.string(),
  name: z.custom<ParcelSimulatorFormLabel | TaxSimulatorFormLabel>(),
  type: z.enum(["text", "number"]).optional(),
  placeholder: z.string(),
})

export type InputProps = z.infer<typeof InputSchema>

const RadioSchema = z.object({
  label: z.string(),
  name: z.custom<ParcelSimulatorFormLabel | TaxSimulatorFormLabel>(),
  options: z.array(z.string()),
  disabled: z.boolean().optional(),
})

export type RadioProps = z.infer<typeof RadioSchema>

const OptionSchema = z.object({
  field:
    z.custom<
      FieldApi<
        any,
        string,
        string,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any
      >
    >(),
  options: z.array(
    z.object({
      name: z.string(),
      available: z.boolean().optional(),
    }),
  ),
  selectedIndex: z.number(),
  setSelectedIndex: z.custom<React.Dispatch<React.SetStateAction<number>>>().optional(),
  type: z.enum(["dynamic", "static"]),
  watch: z.function().optional(),
})

export type OptionsProps = z.infer<typeof OptionSchema>

const SelectSchema = z.object({
  label: z.string(),
  name: z.custom<ParcelSimulatorFormLabel | TaxSimulatorFormLabel>(),
  placeholder: z.string(),
  staticOptions: z
    .array(
      z.object({
        name: z.string(),
        available: z.boolean().optional(),
      }),
    )
    .optional(),
  watch: z.function().optional(),
  loading: z.boolean().optional(),
  actions: z
    .object({
      dynamic: z.boolean().optional(),
      handleOnFocus: z.function(z.tuple([z.custom<TaxSimulatorFormLabel>()])).optional(),
    })
    .optional(),
})

export type SelectProps = z.infer<typeof SelectSchema>
