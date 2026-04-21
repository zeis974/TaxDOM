import type { ParcelSimulatorTemplateType } from "@/components/services/ParcelSimulator/types"
import { queryOptions } from "@tanstack/react-query"
import { apiClient } from "./api-client"

export const fetchTemplates = queryOptions({
  queryKey: ["templates"],
  staleTime: 24 * 60 * 60 * 1000, // 24 hours
  queryFn: async () => {
    const res = await apiClient.api.getTemplates({})
    return res as ParcelSimulatorTemplateType
  },
})
