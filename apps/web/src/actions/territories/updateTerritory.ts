"use server"

import { revalidateTag } from "next/cache"
import { z } from "zod"

const updateTerritorySchema = z.object({
  territoryID: z.string().trim().min(1, "TERRITORY_ID_REQUIRED"),
  territoryName: z.string().trim().min(1, "Le nom du territoire est requis"),
  available: z.enum(["Oui", "Non"]).transform((v) => v === "Oui"),
})

export async function updateTerritory(_: unknown, formData: FormData) {
  const data = {
    territoryID: formData.get("territoryID"),
    territoryName: formData.get("territoryName"),
    available: formData.get("available"),
  }

  let validated: z.infer<typeof updateTerritorySchema>

  try {
    validated = updateTerritorySchema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((e) => e.message)
      return { success: false, errors }
    }
    return { success: false, errors: ["Une erreur de validation est survenue"] }
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}/dashboard/territories/${validated.territoryID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          territoryName: validated.territoryName,
          available: validated.available,
        }),
      },
    )

    const json = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        success: false,
        errors: [json.error || `Erreur HTTP: ${res.status}`],
      }
    }

    revalidateTag("territories", "max")

    return {
      success: true,
      errors: [],
      data: json,
    }
  } catch (error) {
    console.error("Error updating territory:", error)
    return { success: false, errors: ["Erreur lors de la mise à jour du territoire"] }
  }
}
