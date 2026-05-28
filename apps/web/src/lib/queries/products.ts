import type { SelectOption } from "@taxdom/types"
import { apiClient } from "../api/api-client"

export async function searchProducts(query: string): Promise<SelectOption[]> {
  try {
    const res = await apiClient.api.searchProducts({
      query: { name: query },
    })

    if (!Array.isArray(res)) return []

    return res.map((item) => ({
      name: item.name,
      value: item.name,
    }))
  } catch {
    return []
  }
}
