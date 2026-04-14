import type { Territory } from "@taxdom/types"

/**
 * Fetch all available territories from the server
 */
export async function fetchTerritories(): Promise<Territory[]> {
  try {
    const url = `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/dashboard/territories`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      next: {
        tags: ["territories"],
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch territories: ${response.status} ${response.statusText}`)
    }

    const territories = await response.json()
    return territories
  } catch (error) {
    console.error("Error fetching territories:", error)
    return []
  }
}
