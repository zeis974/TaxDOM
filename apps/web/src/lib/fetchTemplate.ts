import type { ParcelSimulatorTemplateType } from "@/services/ParcelSimulator/types"
import { queryOptions } from "@tanstack/react-query"

export const fetchTemplates = queryOptions({
  queryKey: ["templates"],
  queryFn: async () => {
    const res: ParcelSimulatorTemplateType & Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/simulator/templates`,
    ).then((res) => res.json())

    return res
  },
})
