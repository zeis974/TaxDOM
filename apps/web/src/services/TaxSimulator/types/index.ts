import type { OriginDataValue } from "@/services/types"
import type { FieldComponent } from "@tanstack/react-form"

export type TaxSimulatorInputType = "input" | "select" | "radio"

export type TaxSimulatorInputsProps<T> = {
  Field: FieldComponent<any, undefined>
  name: string
  label: string
  type?: "text" | "number"
  placeholder?: string
  actions?: {
    handleOnFocus: (name: T) => void
  }
}

export interface TaxSimulatorRadiosProps extends TaxSimulatorInputsProps<string> {
  disabled?: boolean
  options: Array<string>
}

interface TaxSimulatorFormValues {
  flux: "import" | "export"
  origin: OriginDataValue
  product: string
  territory: string
}

export type TaxSimulatorFormLabel = keyof TaxSimulatorFormValues
export type TaxSimulatorInformationLabel = keyof Omit<TaxSimulatorFormValues, "flux">

export type TaxSimulatorResult = {
  product: string
  tva: number
  om: number
  omr: number
  errors: [
    {
      message: string
    },
  ]
}
