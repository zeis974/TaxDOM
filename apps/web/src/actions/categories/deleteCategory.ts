"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function deleteCategory(
  categoryID: string,
): Promise<{ success: boolean; error?: string }> {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!categoryID || typeof categoryID !== "string" || !uuidRegex.test(categoryID)) {
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
