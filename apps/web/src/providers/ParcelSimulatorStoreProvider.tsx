"use client"

import { type ReactNode, createContext, useContext, useRef } from "react"
import { type StoreApi, useStore } from "zustand"

import {
  type ParcelSimulatorStore,
  createParcelSimulatorStore,
} from "@/stores/ParcelSimulatorStore"

export const ParcelSimulatorStoreContext = createContext<StoreApi<ParcelSimulatorStore> | null>(
  null,
)

export interface ParcelSimulatorStoreProviderProps {
  children: ReactNode
}

export const ParcelSimulatorStoreProvider = ({ children }: ParcelSimulatorStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ParcelSimulatorStore>>()
  if (!storeRef.current) {
    storeRef.current = createParcelSimulatorStore()
  }

  return (
    <ParcelSimulatorStoreContext.Provider value={storeRef.current}>
      {children}
    </ParcelSimulatorStoreContext.Provider>
  )
}

export const useParcelSimulatorStore = <T,>(selector: (store: ParcelSimulatorStore) => T): T => {
  const parcelSimulatorStoreContext = useContext(ParcelSimulatorStoreContext)

  if (!parcelSimulatorStoreContext) {
    throw new Error(`${selector.name} must be used within ParcelSimulatorStoreProvider`)
  }

  return useStore(parcelSimulatorStoreContext, selector)
}
