import type { FieldComponent } from "@tanstack/react-form"

import type {
  TaxSimulatorOriginData,
  TaxSimulatorTerritoryData,
} from "@/services/TaxSimulator/data/TaxSimulatorData"

type TypeFromSet<T extends Set<any>> = T extends Set<infer U> ? U : never

export type Territory = TypeFromSet<typeof TaxSimulatorTerritoryData>
export type Origin = TypeFromSet<typeof TaxSimulatorOriginData>
export type Flux = "import" | "export"

export type TaxSimulatorInputType = "input" | "select" | "radio"

export type TaxSimulatorInputsProps = {
  Field: FieldComponent<TaxSimulatorFormValues, undefined>
  name: TaxSimulatorFormLabel
  label: string
  placeholder?: string
}

export interface TaxSimulatorSelectProps extends TaxSimulatorInputsProps {
  options: Set<Territory | Origin>
}

export interface TaxSimulatorRadiosProps extends TaxSimulatorInputsProps {
  options: Array<TaxSimulatorFormValues["flux"]>
}

export interface TaxSimulatorFormValues {
  product: string
  origin: Origin
  territory: Territory
  flux: Flux
}

export type TaxSimulatorFormLabel = keyof TaxSimulatorFormValues
export type TaxSimulatorInformationLabel = keyof Omit<TaxSimulatorFormValues, "flux">

export type TaxSimulatorResult = {
  product: string
  tva: number
  om: number
  omr: number
}
