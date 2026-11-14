import { useEffect, useState } from "react"

/**
 * Loads a module's default export after a delay, keeping it out of the initial bundle.
 *
 * Unlike `next/dynamic`, the resolved value is held in state and rendered directly, so there is
 * no Suspense round-trip when it is first shown. The pending import is ignored on unmount.
 *
 * @param loader - Dynamic import of the module. Must be stable: declare it at module scope,
 * otherwise the effect restarts on every render.
 * @param delayMs - Time to wait after mount before starting the import.
 * @returns The module's default export once loaded, `null` until then.
 *
 * @example
 * const loadMegaMenu = () => import("./MegaMenu")
 *
 * function NavLinks() {
 *   const MegaMenu = useDeferredImport(loadMegaMenu, 500)
 *   return show && MegaMenu ? <MegaMenu /> : null
 * }
 */
export function useDeferredImport<T>(loader: () => Promise<{ default: T }>, delayMs: number) {
  const [value, setValue] = useState<T | null>(null)

  useEffect(() => {
    let cancelled = false
    const id = setTimeout(() => {
      loader().then((mod) => {
        // Functional form, since T is often a component and would be called as an updater
        if (!cancelled) setValue(() => mod.default)
      })
    }, delayMs)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
  }, [loader, delayMs])

  return value
}
