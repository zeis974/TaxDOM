import { createContext, useContext } from "react"

export const SelectPortalContainerContext = createContext<HTMLElement | null>(null)

export const useSelectPortalContainer = () => useContext(SelectPortalContainerContext)
