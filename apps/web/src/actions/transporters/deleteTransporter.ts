"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

const transporterIdSchema = z.uuidv7("ID du transporteur invalide")

export async function deleteTransporter(
  transporterID: string,
): Promise<{ success: boolean; error?: string }> {
  const parsed = transporterIdSchema.safeParse(transporterID)
  if (!parsed.success) {
    return {
      success: false,
      error: "ID du transporteur invalide",
    }
  }

  try {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.API_URL}/dashboard/transporters/${parsed.data}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        Cookie: cookieStore.toString(),
      },
    })

    if (!res.ok) {
      return {
        success: false,
        error: "Erreur lors de la suppression",
      }
    }

    revalidateTag("transporters", "max")
    revalidateTag("count:transporters", "max")

    return { success: true }
  } catch (error) {
    console.error("Error deleting transporter:", error)
    return {
      success: false,
      error: "Une erreur réseau est survenue. Veuillez réessayer.",
    }
  }
}
