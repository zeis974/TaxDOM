import type { SelectOption } from "@taxdom/types"
import { api } from "./api-client"

/**
 * Type-safe query options for fetching transporters via Tuyau + TanStack Query.
 * The query key is automatically managed by Tuyau.
 */
export const transporterQueryOptions = api.transporters.list.queryOptions(
  {},
  {
    staleTime: 60 * 60 * 1000,
    select: (data): SelectOption[] => data.map((transporter) => ({ name: transporter.name })),
  },
)
