import type { SelectOption, Territory } from "@taxdom/types"
import { queryOptions } from "@tanstack/react-query"

/**
 * Fetch all available territories from the server
 */
export async function fetchTerritories(): Promise<Territory[]> {
  try {
    const url = `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/v1/admin/territories`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch territories: ${response.status} ${response.statusText}`)
    }

    const territories = await response.json()
    return territories
  } catch (error) {
    console.error("Error fetching territories:", error)
    return []
  }
}

export const territoryQueryOptions = queryOptions({
  queryKey: ["territories"],
  queryFn: fetchTerritories,
  staleTime: 60 * 60 * 1000,
})
