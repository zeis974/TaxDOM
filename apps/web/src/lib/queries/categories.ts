import type { Category } from "@taxdom/types"
import { api } from "../api/api-client"

export const categoryQueryOptions = api.categories.index.queryOptions(
  {},
  {
    staleTime: 60 * 60 * 1000,
    select: (data): Category[] => data ?? [],
  },
)
