"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

const updateOriginSchema = z.object({
  originID: z.string().trim().min(1, "ORIGIN_ID_REQUIRED"),
  originName: z.string().trim().min(1, "Le nom de l'origine est requis"),
  available: z.enum(["Oui", "Non"]).transform((v) => v === "Oui"),
  isEU: z.enum(["Oui", "Non"]).transform((v) => v === "Oui"),
})

export async function updateOrigin(_: unknown, formData: FormData) {
  const data = {
    originID: formData.get("originID"),
    originName: formData.get("originName"),
    available: formData.get("available"),
    isEU: formData.get("isEU"),
  }

  let validated: z.infer<typeof updateOriginSchema>

  try {
    validated = updateOriginSchema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((e) => e.message)
      return { success: false, errors }
    }
    return { success: false, errors: ["Une erreur de validation est survenue"] }
  }

  try {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.API_URL}/dashboard/origins/${validated.originID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        originName: validated.originName,
        available: validated.available,
        isEU: validated.isEU,
      }),
    })

    const json = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        success: false,
        errors: [json.error || `Erreur HTTP: ${res.status}`],
      }
    }

    revalidateTag("origins", "max")

    return {
      success: true,
      errors: [],
      data: json,
    }
  } catch (error) {
    console.error("Error updating origin:", error)
    return { success: false, errors: ["Erreur lors de la mise à jour de l'origine"] }
  }
}
