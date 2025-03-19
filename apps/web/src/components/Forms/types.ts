import type { FieldApi } from "@tanstack/react-form"
import type { TaxSimulatorFormLabel } from "@/services/TaxSimulator/types"
import type { ParcelSimulatorFormLabel } from "@/services/ParcelSimulator/types"

export type TaxSimulatorInputsType = "input" | "select" | "radio"

export type InputProps = {
  label: string
  name?: TaxSimulatorFormLabel | ParcelSimulatorFormLabel | undefined
  type?: "text" | "number"
  placeholder: string
  actions?: {
    handleOnFocus: (name: any) => void
  }
}

export type RadioProps = {
  label: string
  name?: TaxSimulatorFormLabel | ParcelSimulatorFormLabel | undefined
  disabled?: boolean
  options: Array<string>
}

type Option = {
  error?: string
  name: string
  available?: boolean
}

export interface OptionsProps {
  field: FieldApi<
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
  options: Option[]
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  type: "dynamic" | "static"
  watch?: (value: string) => void
}

export type SelectProps = {
  label: string
  placeholder: string
  staticOptions?: Option[]
  loading?: boolean
  watch?: (value: any) => void
  actions?: {
    dynamic?: boolean
    handleOnFocus?: (name: any) => void
  }

  // name: TaxSimulatorFormLabel | ParcelSimulatorFormLabel | ""
}
