"use server"

import { revalidateTag } from "next/cache"
import { z } from "zod"

const createCategorySchema = z.object({
  categoryName: z.string().trim().min(1, "CATEGORY_NAME_REQUIRED"),
  tva: z.coerce.number().positive("TAX_RATES_MUST_BE_POSITIVE"),
  om: z.coerce.number().positive("TAX_RATES_MUST_BE_POSITIVE"),
  omr: z.coerce.number().positive("TAX_RATES_MUST_BE_POSITIVE"),
})

export default async function createCategory(_: unknown, formData: FormData) {
  const data = {
    categoryName: formData.get("categoryName"),
    tva: formData.get("tva"),
    om: formData.get("om"),
    omr: formData.get("omr"),
  }

  console.log(data)

  let validatedData: z.infer<typeof createCategorySchema>

  try {
    validatedData = createCategorySchema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((e) => e.message)
      return {
        errors,
        success: false,
      }
    }
    return {
      errors: ["Une erreur de validation est survenue"],
      success: false,
    }
  }

  try {
    const res = await fetch(`${process.env.API_URL}/dashboard/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(validatedData),
    })

    const responseData = await res.json()

    if (!res.ok) {
      return {
        errors: [
          responseData.error || "Une erreur est survenue lors de la création de la catégorie",
        ],
        success: false,
      }
    }

    revalidateTag("categories", "max")

    return {
      success: true,
      errors: [],
      data: responseData,
    }
  } catch (error) {
    console.error("Error creating category:", error)
    return {
      errors: ["Une erreur est survenue lors de la création de la catégorie"],
      success: false,
    }
  }
}
