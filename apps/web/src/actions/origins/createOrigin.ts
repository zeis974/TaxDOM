"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

const createOriginSchema = z.object({
  originName: z.string().trim().min(1, "The name of the origin is required"),
  isActive: z.boolean(),
  isEU: z.boolean(),
})

export async function createOrigin(_: unknown, formData: FormData) {
  const rawData = {
    originName: formData.get("originName"),
    isActive: formData.get("isActive") === "on",
    isEU: formData.get("isEU") === "on",
  }

  const validation = createOriginSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      errors: validation.error.issues.map((issue) => issue.message),
      success: false,
    }
  }

  const data = validation.data
  const cookieStore = await cookies()

  try {
    const res = await fetch(`${process.env.API_URL}/dashboard/origins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    })

    const responseData = await res.json()

    if (!res.ok) {
      return {
        errors: [responseData.error || "Une erreur est survenue lors de la création de l'origine"],
        success: false,
      }
    }

    revalidateTag("origins", "max")
    revalidateTag("count:origins", "max")
    revalidateTag("origins_dashboard", "max")

    return {
      success: true,
      errors: [],
      data: responseData,
    }
  } catch (error) {
    console.error("Error creating origin:", error)
    return {
      errors: ["Une erreur est survenue lors de la création de l'origine"],
      success: false,
    }
  }
}
