"use server"

import { apiClient } from "@/lib/api-server"

export async function searchProducts(value: string) {
  const res = await apiClient.api.searchProducts({
    query: { name: value },
  })

  return res
}
