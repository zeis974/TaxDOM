import type { SelectOption } from "@taxdom/types"
import { api } from "./api-client"

/**
 * Type-safe query options for fetching origins via Tuyau + TanStack Query.
 * The query key is automatically managed by Tuyau.
 */
export const originQueryOptions = api.origins.list.queryOptions(
  {},
  {
    staleTime: 60 * 60 * 1000, // 1 hour for reference data
    select: (data): SelectOption[] =>
      data.map((o) => ({
        name: o.name,
        available: true,
      })),
  },
)
