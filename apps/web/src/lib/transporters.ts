import type { SelectOption } from "@taxdom/types"
import { queryOptions } from "@tanstack/react-query"
import { apiClient } from "./api-client"

/**
 * Fetch all available transporters from the server
 */
export async function fetchTransporters(): Promise<SelectOption[]> {
  try {
    const transporters = await apiClient.api.transporters.list({})
    return transporters.map((transporter) => ({ name: transporter.name }))
  } catch (error) {
    console.error("Error fetching transporters:", error)
    return []
  }
}

export const transporterQueryOptions = queryOptions({
  queryKey: ["transporters"],
  queryFn: fetchTransporters,
  staleTime: 60 * 60 * 1000,
})
