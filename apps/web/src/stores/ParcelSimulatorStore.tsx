import type { ParcelSimulatorResult } from "@taxdom/types"
import { createStore } from "zustand/vanilla"

export type ParcelState = {
  result: ParcelSimulatorResult | null
  hasResult: boolean
}

export type TaxActions = {
  setResult: (value: ParcelState["result"]) => void
  setHasResult: (value: ParcelState["hasResult"]) => void
}

export type ParcelSimulatorStore = ParcelState & TaxActions

export const defaultInitState: ParcelState = {
  result: null,
  hasResult: false,
}

export const createParcelSimulatorStore = (initState: ParcelState = defaultInitState) => {
  return createStore<ParcelSimulatorStore>()((set) => ({
    ...initState,
    setResult: (value) => set({ result: value }),
    setHasResult: (value) => set({ hasResult: value }),
  }))
}
