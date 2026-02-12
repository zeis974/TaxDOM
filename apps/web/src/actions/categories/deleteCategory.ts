"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

const categoryIdSchema = z.uuidv7("Identifiant de catégorie invalide.")

export async function deleteCategory(
  categoryID: string,
): Promise<{ success: boolean; error?: string }> {
  const parsed = categoryIdSchema.safeParse(categoryID)
  if (!parsed.success) {
    return { success: false, error: "Identifiant de catégorie invalide." }
  }

  try {
    const cookieStore = await cookies()

    const res = await fetch(`${process.env.API_URL}/dashboard/categories/${categoryID}`, {
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

    revalidateTag("categories_dashboard", "max")
    revalidateTag("categories", "max")

    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)
    return { success: false, error: "Erreur lors de la suppression de la catégorie" }
  }
}
