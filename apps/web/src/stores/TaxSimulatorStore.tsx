import type {
  TaxSimulatorFormLabel,
  TaxSimulatorResult,
} from "@/components/services/TaxSimulator/types"
import { createStore } from "zustand/vanilla"

export type TaxState = {
  focusInput: TaxSimulatorFormLabel | null
  result: TaxSimulatorResult | null
  hasResult: boolean
  selectedCountry: string | null
}

export type TaxActions = {
  setFocusInput: (value: TaxState["focusInput"]) => void
  setResult: (value: TaxState["result"]) => void
  setHasResult: (value: TaxState["hasResult"]) => void
  setSelectedCountry: (value: TaxState["selectedCountry"]) => void
}

export type TaxSimulatorStore = TaxState & TaxActions

export const defaultInitState: TaxState = {
  focusInput: null,
  result: null,
  hasResult: false,
  selectedCountry: null,
}

export const createTaxSimulatorStore = (initState: TaxState = defaultInitState) => {
  return createStore<TaxSimulatorStore>()((set) => ({
    ...initState,
    setFocusInput: (value) => set({ focusInput: value }),
    setResult: (value) => set({ result: value }),
    setHasResult: (value) => set({ hasResult: value }),
    setSelectedCountry: (value) => set({ selectedCountry: value }),
  }))
}
