"use server"

import { revalidateTag } from "next/cache"

export async function deleteTerritory(
  territoryID: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${process.env.API_URL}/dashboard/territories/${territoryID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return { success: false, error: err.error || `Erreur HTTP: ${res.status}` }
    }

    revalidateTag("territories", "max")
    return { success: true }
  } catch (error) {
    console.error("Error deleting territory:", error)
    return { success: false, error: "Erreur lors de la suppression du territoire" }
  }
}
