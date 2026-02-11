"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

const updateCategorySchema = z.object({
  categoryID: z.string().uuid("Identifiant de catégorie invalide"),
  categoryName: z.string().trim().min(1, "Le nom de la catégorie est requis").max(255),
  taxID: z.string().uuid("Identifiant de taxe invalide").optional(),
})

export async function updateCategory(_: unknown, formData: FormData) {
  const data = {
    categoryID: formData.get("categoryID"),
    categoryName: formData.get("categoryName"),
    taxID: formData.get("taxID") || undefined,
  }

  let validated: z.infer<typeof updateCategorySchema>

  try {
    validated = updateCategorySchema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((e) => e.message)
      return { success: false, errors }
    }
    return { success: false, errors: ["Une erreur de validation est survenue"] }
  }

  try {
    const cookieStore = await cookies()

    const res = await fetch(`${process.env.API_URL}/dashboard/categories/${validated.categoryID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        categoryName: validated.categoryName,
        taxID: validated.taxID,
      }),
    })

    const json = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        success: false,
        errors: [json.error || `Erreur HTTP: ${res.status}`],
      }
    }

    revalidateTag("categories_dashboard", "max")
    revalidateTag("categories", "max")

    return {
      success: true,
      errors: [],
      data: json,
    }
  } catch (error) {
    console.error("Error updating category:", error)
    return { success: false, errors: ["Erreur lors de la mise à jour de la catégorie"] }
  }
}
