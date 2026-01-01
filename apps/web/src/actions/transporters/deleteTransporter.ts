"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

export type DeleteTransporterResult = {
  success: boolean
  error?: string
}

export async function deleteTransporter(transporterID: string): Promise<DeleteTransporterResult> {
  if (!transporterID || typeof transporterID !== "string") {
    return {
      success: false,
      error: "ID du transporteur manquant",
    }
  }

  try {
    const cookieStore = await cookies()
    const res = await fetch(`${process.env.API_URL}/dashboard/transporters/${transporterID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        Cookie: cookieStore.toString(),
      },
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return {
        success: false,
        error: data.error || "Erreur lors de la suppression",
      }
    }

    // Revalidate cache
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
