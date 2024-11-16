import type { FieldApi, FieldComponent } from "@tanstack/react-form"

interface Option {
  error?: string
  name: string
  available?: boolean
}

export interface OptionsProps<T> {
  field: FieldApi<any, any, any, any>
  loading: boolean
  options: Option[]
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  type: "dynamic" | "static"
  watch?: (value: T) => void
}

export interface SelectProps<T> {
  Field: FieldComponent<any, undefined>
  watch?: (value: T) => void
  actions?: {
    dynamic?: boolean
    handleOnFocus?: (name: T) => void
  }
  label: string
  name: string
  staticOptions?: Option[]
  placeholder?: string
  type?: "text" | "number"
}
