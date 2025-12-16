"use server"

import { revalidateTag } from "next/cache"
import type { Category } from "@taxdom/types"

interface UpdateCategoryParams {
  categoryID: number
  categoryName: string
  taxID?: number
}

export async function updateCategory(params: UpdateCategoryParams): Promise<{
  success: boolean
  data?: Category
  error?: string
}> {
  try {
    const { categoryID, categoryName, taxID } = params

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify({
        categoryName: categoryName.trim(),
        taxID: taxID || undefined,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.error || `Erreur HTTP: ${response.status}`,
      }
    }

    const category: Category = await response.json()

    // Invalider les caches pour forcer la mise à jour
    revalidateTag("categories", "max")
    revalidateTag(`category-${categoryID}`, "max")

    return {
      success: true,
      data: category,
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie:", error)
    return {
      success: false,
      error: "Erreur de connexion au serveur",
    }
  }
}
