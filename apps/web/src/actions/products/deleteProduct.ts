"use server"

import { revalidateTag } from "next/cache"
import { z } from "zod"

const productIdSchema = z.uuidv7("Identifiant de produit invalide.")

export async function deleteProduct(
  productID: string,
): Promise<{ success: boolean; error?: string }> {
  const parsed = productIdSchema.safeParse(productID)
  if (!parsed.success) {
    return { success: false, error: "Identifiant de produit invalide." }
  }

  try {
    const res = await fetch(`${process.env.API_URL}/dashboard/products/${productID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return { success: false, error: err.error || `Erreur HTTP: ${res.status}` }
    }

    revalidateTag("products", "max")

    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { success: false, error: "Erreur lors de la suppression du produit" }
  }
}
