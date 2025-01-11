"use client"

import { type ReactNode, createContext, use, useRef } from "react"
import { type StoreApi, useStore } from "zustand"

import { type TaxSimulatorStore, createTaxSimulatorStore } from "@/stores/TaxSimulatorStore"

export const TaxSimulatorStoreContext = createContext<StoreApi<TaxSimulatorStore> | null>(null)

export interface TaxSimulatorStoreProviderProps {
  children: ReactNode
}

export const TaxSimulatorStoreProvider = ({ children }: TaxSimulatorStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TaxSimulatorStore>>(undefined)
  if (!storeRef.current) {
    storeRef.current = createTaxSimulatorStore()
  }

  return <TaxSimulatorStoreContext value={storeRef.current}>{children}</TaxSimulatorStoreContext>
}

export const useTaxSimulatorStore = <T,>(selector: (store: TaxSimulatorStore) => T): T => {
  const taxSimulatorStoreContext = use(TaxSimulatorStoreContext)

  if (!taxSimulatorStoreContext) {
    throw new Error(`${selector.name} must be used within TaxSimulatorStoreProvider`)
  }

  return useStore(taxSimulatorStoreContext, selector)
}
