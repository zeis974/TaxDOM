import type { SelectOption } from "@taxdom/types"
import { api } from "./api-client"

/**
 * Type-safe query options for fetching territories via Tuyau + TanStack Query.
 * The query key is automatically managed by Tuyau.
 */
export const territoryQueryOptions = api.territories.list.queryOptions(
  {},
  {
    staleTime: 60 * 60 * 1000,
    select: (data): SelectOption[] => data.map((territory) => ({ name: territory.name })),
  },
)
