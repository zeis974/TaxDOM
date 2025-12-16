"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function deleteOrigin(
  originID: string,
): Promise<{ success: boolean; error?: string }> {
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
