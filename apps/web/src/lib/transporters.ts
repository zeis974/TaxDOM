import type { SelectOption, Transporter } from "@taxdom/types"
import { queryOptions } from "@tanstack/react-query"

/**
 * Fetch all available transporters from the server
 */
export async function fetchTransporters(): Promise<SelectOption[]> {
  try {
    const url = `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/v1/admin/transporters/list`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch transporters: ${response.status} ${response.statusText}`)
    }

    const transporters = (await response.json()) as Transporter[]
    return transporters.map((t) => ({
      name: t.transporterName,
      value: t.transporterID,
    }))
  } catch (error) {
    console.error("Error fetching transporters:", error)
    return []
  }
}

export const transporterQueryOptions = queryOptions({
  queryKey: ["transporters"],
  queryFn: fetchTransporters,
  staleTime: 60 * 60 * 1000,
})
