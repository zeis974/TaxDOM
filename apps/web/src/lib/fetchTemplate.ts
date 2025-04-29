import type { ParcelSimulatorTemplateType } from "@/services/ParcelSimulator/types"
import { queryOptions } from "@tanstack/react-query"

export const fetchTemplates = queryOptions({
  queryKey: ["templates"],
  staleTime: 24 * 60 * 60 * 1000, // 24 hours
  queryFn: async () => {
    const res: ParcelSimulatorTemplateType & Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/simulator/templates`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      },
    ).then((res) => res.json())

    return res
  },
})
