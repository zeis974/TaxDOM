"use server"

import { revalidateTag } from "next/cache"
import { z } from "zod"

const updateProductSchema = z.object({
  productID: z.string().trim().min(1, "PRODUCT_ID_REQUIRED"),
  productName: z.string().trim().min(1, "Le nom du produit est requis").max(255),
  categoryID: z.string().trim().min(1, "La catégorie est requise"),
  originID: z.string().trim().min(1, "L'origine est requise"),
  territoryID: z.string().trim().min(1, "Le territoire est requis"),
  fluxID: z.string().trim().min(1, "Le flux est requis"),
  taxID: z.string().trim().min(1, "La taxe est requise"),
})

export async function updateProduct(_: unknown, formData: FormData) {
  const data = {
    productID: formData.get("productID"),
    productName: formData.get("productName"),
    categoryID: formData.get("categoryID"),
    originID: formData.get("originID"),
    territoryID: formData.get("territoryID"),
    fluxID: formData.get("fluxID"),
    taxID: formData.get("taxID"),
  }

  let validated: z.infer<typeof updateProductSchema>

  try {
    validated = updateProductSchema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.issues.map((e) => e.message) }
    }
    return { success: false, errors: ["Une erreur de validation est survenue"] }
  }

  try {
    const { productID, ...body } = validated

    const res = await fetch(`${process.env.API_URL}/dashboard/products/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(body),
    })

    const json = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        success: false,
        errors: [json.error || `Erreur HTTP: ${res.status}`],
      }
    }

    revalidateTag("products", "max")

    return { success: true, errors: [], data: json }
  } catch (error) {
    console.error("Error updating product:", error)
    return { success: false, errors: ["Erreur lors de la mise à jour du produit"] }
  }
}
