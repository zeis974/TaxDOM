import { useEffect, useState } from "react"

const API_BASE = (import.meta as { env: Record<string, string> }).env.VITE_API_URL || "http://localhost:3333"

export type NomenclatureSuggestion = {
  code: string
  description: string
  chapter: number
  alinea: number
  parentCode: string | null
}

export function useNomenclatureSearch(query: string, minLength = 2) {
  const [suggestions, setSuggestions] = useState<NomenclatureSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query.trim().length < minLength) {
      setSuggestions([])
      return
    }

    const controller = new AbortController()
    let timeout: ReturnType<typeof setTimeout>

    const doFetch = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(
          `${API_BASE}/v1/admin/customs-nomenclatures/search?q=${encodeURIComponent(query)}`,
          { credentials: "include", signal: controller.signal },
        )
        if (!res.ok) return
        const json = await res.json()
        setSuggestions(json.data ?? [])
      } catch {
        // aborted or network error — ignore
      } finally {
        setIsLoading(false)
      }
    }

    timeout = setTimeout(doFetch, 300)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [query, minLength])

  return { suggestions, isLoading }
}
