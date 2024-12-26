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

export interface TaxSimulatorFormValues {
  product: string
  origin: string
  territory: string
  flux: "import" | "export"
}

export type TaxSimulatorFormLabel = keyof TaxSimulatorFormValues
export type TaxSimulatorInformationLabel = keyof Omit<TaxSimulatorFormValues, "flux">

export type TaxSimulatorResult = {
  product: string
  tva: number
  om: number
  omr: number
  errors?: [{ message: "Too many requests" }]
}
