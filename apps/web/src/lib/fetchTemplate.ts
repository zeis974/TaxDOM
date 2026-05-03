import type { ParcelSimulatorTemplateType } from "@/components/services/ParcelSimulator/types"
import { api } from "./api-client"

export const fetchTemplates = api.getTemplates.queryOptions(
  {},
  {
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    select: (data) => data as ParcelSimulatorTemplateType,
  },
)
