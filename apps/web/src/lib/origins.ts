import type { SelectOption } from "@taxdom/types"
import { queryOptions } from "@tanstack/react-query"

export type OriginResponse = {
  name: string
  isEU: boolean
}

/**
 * Fetch all available origins from the public API
 */
export async function fetchOrigins(): Promise<SelectOption[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/public/origins`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch origins: ${response.status} ${response.statusText}`)
  }

  const origins = (await response.json()) as OriginResponse[]
  return origins.map((o) => ({
    name: o.name,
    available: true,
  }))
}

export const originQueryOptions = queryOptions({
  queryKey: ["origins"],
  queryFn: fetchOrigins,
  staleTime: 60 * 60 * 1000, // 1 hour for reference data
})
