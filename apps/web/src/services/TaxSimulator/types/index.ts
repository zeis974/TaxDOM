import type { FieldComponent } from "@tanstack/react-form"
import type { TaxSimulatorFormLabel, TaxSimulatorFormValues } from "@taxdom/types"

export type TaxSimulatorInputType = "input" | "select" | "radio"

export type TaxSimulatorInputsProps = {
  Field: FieldComponent<TaxSimulatorFormValues, undefined>
  name: TaxSimulatorFormLabel
  label: string
  placeholder?: string
}

export interface TaxSimulatorSelectProps extends TaxSimulatorInputsProps {
  options: string[]
}

export interface TaxSimulatorRadiosProps extends TaxSimulatorInputsProps {
  options: Array<TaxSimulatorFormValues["flux"]>
}

export type TaxSimulatorInformationLabel = keyof Omit<TaxSimulatorFormValues, "flux">
