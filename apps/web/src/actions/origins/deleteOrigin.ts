"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

const originIdSchema = z.uuidv7("Identifiant d'origine invalide.")

export async function deleteOrigin(
  originID: string,
): Promise<{ success: boolean; error?: string }> {
  const parsed = originIdSchema.safeParse(originID)
  if (!parsed.success) {
    return { success: false, error: "Identifiant d'origine invalide." }
  }

  try {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.API_URL}/dashboard/origins/${originID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        Cookie: cookieStore.toString(),
      },
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return { success: false, error: err.error || `Erreur HTTP: ${res.status}` }
    }

    revalidateTag("origins", "max")
    return { success: true }
  } catch (error) {
    console.error("Error deleting origin:", error)
    return { success: false, error: "Erreur lors de la suppression de l'origine" }
  }
}
