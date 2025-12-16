"use server"

import { revalidateTag } from "next/cache"
import { z } from "zod"

const createTerritorySchema = z.object({
  territoryName: z.string().trim().min(1, "Le nom du territoire est requis"),
})

export async function createTerritory(_: unknown, formData: FormData) {
  const data = {
    territoryName: formData.get("territory"),
  }

  let validatedData: z.infer<typeof createTerritorySchema>

  try {
    validatedData = createTerritorySchema.parse(data)
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
    const res = await fetch(`${process.env.API_URL}/dashboard/territories`, {
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
        errors: [responseData.error || "Une erreur est survenue lors de la création du territoire"],
        success: false,
      }
    }

    revalidateTag("territories", "max")
    revalidateTag("count:territories", "max")

    return {
      success: true,
      errors: [],
      data: responseData,
    }
  } catch (error) {
    console.error("Error creating territory:", error)
    return {
      errors: ["Une erreur est survenue lors de la création du territoire"],
      success: false,
    }
  }
}
