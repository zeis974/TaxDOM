import type { SelectOption } from "@taxdom/types"
import { api } from "../api/api-client"

export const territoryQueryOptions = api.territories.list.queryOptions(
  {},
  {
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    select: (data): SelectOption[] => data.map((territory) => ({ name: territory.name })),
  },
)
