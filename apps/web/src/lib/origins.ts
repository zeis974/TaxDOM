import type { SelectOption } from "@taxdom/types"
import { queryOptions } from "@tanstack/react-query"
import { apiClient } from "./api-client"

export type OriginResponse = {
  name: string
  isEU: boolean
}

/**
 * Fetch all available origins from the public API
 */
export async function fetchOrigins(): Promise<SelectOption[]> {
  const origins = await apiClient.api.origins.list({})
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
