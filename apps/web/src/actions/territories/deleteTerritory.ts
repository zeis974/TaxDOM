"use server"

import { revalidateTag } from "next/cache"
import { z } from "zod"

const territoryIdSchema = z.uuidv7("Identifiant de territoire invalide.")

export async function deleteTerritory(
  territoryID: string,
): Promise<{ success: boolean; error?: string }> {
  const parsed = territoryIdSchema.safeParse(territoryID)
  if (!parsed.success) {
    return { success: false, error: "Identifiant de territoire invalide." }
  }
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
