"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import { z } from "zod"

const updateTransporterSchema = z.object({
  transporterID: z.string().min(1, "ID du transporteur requis"),
  transporterName: z
    .string()
    .trim()
    .min(1, "Le nom du transporteur est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  available: z.boolean(),
})

export type UpdateTransporterState = {
  success: boolean
  errors: string[]
}

export async function updateTransporter(
  _: UpdateTransporterState,
  formData: FormData,
): Promise<UpdateTransporterState> {
  const data = {
    transporterID: formData.get("transporterID"),
    transporterName: formData.get("transporterName"),
    available: formData.get("available") === "true",
  }

  const validation = updateTransporterSchema.safeParse(data)

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.issues.map((issue) => issue.message),
    }
  }

  try {
    const cookieStore = await cookies()
    const res = await fetch(
      `${process.env.API_URL}/dashboard/transporters/${validation.data.transporterID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          transporterName: validation.data.transporterName,
          available: validation.data.available,
        }),
      },
    )

    if (!res.ok) {
      const responseData = await res.json().catch(() => ({}))
      return {
        success: false,
        errors: [responseData.error || "Erreur lors de la mise à jour"],
      }
    }

    revalidateTag("transporters", "max")
    revalidateTag("count:transporters", "max")

    return {
      success: true,
      errors: [],
    }
  } catch (error) {
    console.error("Error updating transporter:", error)
    return {
      success: false,
      errors: ["Une erreur réseau est survenue. Veuillez réessayer."],
    }
  }
}
