import type { Category } from "@taxdom/types"

/**
 * Fetch all available categories from the server
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const url = `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/dashboard/categories`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      next: {
        tags: ["categories"],
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`)
    }

    const categories = await response.json()
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
