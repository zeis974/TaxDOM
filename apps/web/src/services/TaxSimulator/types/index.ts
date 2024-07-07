import type { FormApi } from "@tanstack/react-form"

export type Territory =
  | "CORSE" // Corse
  | "FRANCE" // France continentale
  | "GUADELOUPE" // Guadeloupe
  | "GUYANE" // Guyane française
  | "MARTINIQUE" // Martinique
  | "MAYOTTE" // Mayotte
  | "REUNION" // Réunion

export type Origin =
  | "EU" // Union européenne
  | "HORS_EU" // Hors Union européenne

export type TaxSimulatorInputType = "input" | "select" | "radio"

export type TaxSimulatorInputsProps = {
  form: FormApi<TaxSimulatorFormValues, undefined>
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

export interface TaxSimulatorFormValues {
  product: string
  origin: Origin
  territory: Territory
  flux: "import" | "export"
}

export type TaxSimulatorFormLabel = keyof TaxSimulatorFormValues
