import type { SelectOption } from "@taxdom/types"
import { queryOptions } from "@tanstack/react-query"
import { apiClient } from "./api-client"

/**
 * Fetch all available territories from the server
 */
export async function fetchTerritories(): Promise<SelectOption[]> {
  try {
    const territories = await apiClient.api.territories.list({})
    return territories.map((territory) => ({ name: territory.name }))
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
