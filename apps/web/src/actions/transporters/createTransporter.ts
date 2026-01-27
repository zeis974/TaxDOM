"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import { z } from "zod"

const createTransporterSchema = z.object({
  transporterName: z
    .string()
    .trim()
    .min(1, "Le nom du transporteur est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
})

export type CreateTransporterState = {
  success: boolean
  errors: string[]
  data?: unknown
}

export async function createTransporter(
  _: CreateTransporterState,
  formData: FormData,
): Promise<CreateTransporterState> {
  // Get the transporter name from the form (field name is "transporter")
  const rawName = formData.get("transporter")

  const data = {
    transporterName: typeof rawName === "string" ? rawName : "",
  }

  // Validate input
  const validation = createTransporterSchema.safeParse(data)

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.issues.map((issue) => issue.message),
    }
  }

  try {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.API_URL}/dashboard/transporters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(validation.data),
    })

    const responseData = await res.json()

    if (!res.ok) {
      return {
        success: false,
        errors: [responseData.error || "Erreur lors de la création du transporteur"],
      }
    }

    // Revalidate cache
    revalidateTag("transporters", "max")
    revalidateTag("count:transporters", "max")

    return {
      success: true,
      errors: [],
      data: responseData,
    }
  } catch (error) {
    console.error("Error creating transporter:", error)
    return {
      success: false,
      errors: ["Une erreur réseau est survenue. Veuillez réessayer."],
    }
  }
}
