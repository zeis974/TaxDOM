import type { TaxSimulatorFormLabel } from "@taxdom/types"
import { createStore } from "zustand/vanilla"

export type TaxState = {
  focusInput: TaxSimulatorFormLabel | undefined
}

export type TaxActions = {
  setFocusInput: (value: TaxState["focusInput"]) => void
}

export type TaxSimulatorStore = TaxState & TaxActions

export const defaultInitState: TaxState = {
  focusInput: undefined,
}

export const createTaxSimulatorStore = (initState: TaxState = defaultInitState) => {
  return createStore<TaxSimulatorStore>()((set) => ({
    ...initState,
    setFocusInput: (value) => set({ focusInput: value }),
  }))
}
