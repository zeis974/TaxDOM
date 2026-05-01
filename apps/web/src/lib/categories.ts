import type { Category } from "@taxdom/types"
import { api } from "./api-client"

/**
 * Type-safe query options for fetching categories via Tuyau + TanStack Query.
 * The query key is automatically managed by Tuyau.
 */
export const categoryQueryOptions = api.categories.index.queryOptions(
  {},
  {
    staleTime: 60 * 60 * 1000, // 1 hour for reference data
    select: (data): Category[] => data ?? [],
  },
)
