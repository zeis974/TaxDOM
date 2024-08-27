import type { FieldComponent } from "@tanstack/react-form"

import type {
  TaxSimulatorOriginData,
  TaxSimulatorTerritoryData,
} from "@/services/TaxSimulator/data/TaxSimulatorData"

// biome-ignore lint/suspicious/noExplicitAny: any
type TypeFromSet<T extends Set<any>> = T extends Set<infer U> ? U : never

export type Territory = TypeFromSet<typeof TaxSimulatorTerritoryData>
export type Origin = TypeFromSet<typeof TaxSimulatorOriginData>
export type Flux = "import" | "export"

export type TerritoryAndOriginType = Territory | Origin

export type TaxSimulatorInputType = "input" | "select" | "radio"

export type TaxSimulatorInputsProps<T> = {
  // biome-ignore lint/suspicious/noExplicitAny: TParentData is not the same in each service
  Field: FieldComponent<any, undefined>
  name: string
  label: string
  placeholder?: string
  actions?: {
    handleOnFocus: (name: T) => void
  }
}

export interface TaxSimulatorSelectProps<T> extends TaxSimulatorInputsProps<T> {
  options: Set<TerritoryAndOriginType>
  watch?: (value: string) => void
  actions?: {
    handleOnFocus: (name: T) => void
  }
}

export interface TaxSimulatorRadiosProps extends TaxSimulatorInputsProps<Flux> {
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
