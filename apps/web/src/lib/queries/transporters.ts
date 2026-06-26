import type { SelectOption } from "@taxdom/types"
import { api } from "../api/api-client"

export const transporterQueryOptions = api.transporters.list.queryOptions(
  {},
  {
    staleTime: 60 * 60 * 1000,
    select: (data): SelectOption[] => data.map((transporter) => ({ name: transporter.name })),
  },
)
