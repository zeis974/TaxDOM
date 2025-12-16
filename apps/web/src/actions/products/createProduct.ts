"use server"

import { revalidateTag } from "next/cache"

export default async function createProduct(_: unknown, formData: FormData) {
  try {
    const productName = (formData.get("productName") as string) || ""
    const originName = (formData.get("origin") as string) || ""
    const territoryName = (formData.get("territory") as string) || ""
    const categoryName = (formData.get("category") as string) || ""

    // Validation basique
    const errors: string[] = []
    if (!productName.trim()) errors.push("Le nom du produit est requis")
    if (!originName.trim()) errors.push("L'origine est requise")
    if (!territoryName.trim()) errors.push("Le territoire d'application est requis")
    if (!categoryName.trim()) errors.push("La catégorie est requise")
    if (errors.length > 0) {
      return { success: false, errors }
    }

    const res = await fetch(`${process.env.API_URL}/dashboard/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        productName: productName.trim(),
        categoryName: categoryName.trim(),
        originName: originName.trim(),
        territoryName: territoryName.trim(),
      }),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return {
        success: false,
        errors: [errorData.message || "Erreur lors de la création du produit"],
      }
    }

    revalidateTag("products", "max")
    revalidateTag("recent:products", "max")
    revalidateTag("count:products", "max")

    return { success: true, errors: [] }
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error)
    return {
      success: false,
      errors: ["Une erreur est survenue lors de la création du produit"],
    }
  }
}
