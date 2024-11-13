import type { FieldApi, FieldComponent } from "@tanstack/react-form"
import type { TerritoryAndOriginDataValue, TerritoryAndOriginType } from "@/services/types"

export interface OptionsProps<T> {
  field: FieldApi<any, any, any, any>
  loading: boolean
  options: { error?: string; name: string; available?: boolean }[]
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  type: "dynamic" | "static"
  watch?: (value: T) => void
}

export interface SelectProps<T> {
  Field: FieldComponent<any, undefined>
  actions: {
    dynamic?: boolean
    handleOnFocus: (name: T) => void
    watch?: (value: T) => void
  }
  label: string
  name: string
  staticOptions?: TerritoryAndOriginType
  placeholder?: string
  type?: "text" | "number"
}
