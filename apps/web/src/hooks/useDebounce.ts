import { useEffect, useState } from "react"

/**
 * Hook personnalisé pour débouncer une valeur
 *
 * @param value - La valeur à débouncer
 * @param delay - Le délai en millisecondes avant de mettre à jour la valeur debouncée
 * @returns La valeur debouncée
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("")
 * const debouncedSearchTerm = useDebounce(searchTerm, 300)
 *
 * // La valeur debouncée ne sera mise à jour que 300ms après le dernier changement
 * useEffect(() => {
 *   // Effectuer la recherche avec debouncedSearchTerm
 * }, [debouncedSearchTerm])
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Créer un timer qui mettra à jour la valeur debouncée après le délai
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Nettoyer le timer si la valeur change avant que le délai soit écoulé
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
