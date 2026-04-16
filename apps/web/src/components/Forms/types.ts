import type { SelectOption } from "@taxdom/types"

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

export type SelectCommonProps = {
  label: string
  placeholder?: string
  loading?: boolean
}

export type SelectStaticProps = SelectCommonProps & {
  options: SelectOption[]
  onSearch?: never
}

export type SelectDynamicProps = SelectCommonProps & {
  options?: never
  onSearch: (query: string) => Promise<SelectOption[]>
  searchDebounceMs?: number
  searchMinChars?: number
}

export type SelectProps = (SelectStaticProps | SelectDynamicProps) & {
  name: FormLabel
}

export type SelectFieldProps = Omit<SelectCommonProps, never> & {
  options?: SelectOption[]
  onSearch?: (query: string) => Promise<SelectOption[]>
  name?: string
}
