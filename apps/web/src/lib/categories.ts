import type { Category } from "@taxdom/types"
import { apiClient } from "./api-client"

/**
 * Fetch all available categories from the server
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const categories = await apiClient.api.categories.index({})
    return categories ?? []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
