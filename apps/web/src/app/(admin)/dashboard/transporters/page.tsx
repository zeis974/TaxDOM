import type { Metadata } from "next"
import { headers } from "next/headers"

import Transporters from "@/components/Dashboard/Transporters"
import type { Transporter } from "@taxdom/types"

export const metadata: Metadata = {
  title: "Transporteurs | Dashboard",
  description: "Gérez les transporteurs disponibles sur la plateforme",
}

async function getTransporters(cookie: string): Promise<Transporter[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/dashboard/transporters`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      next: {
        revalidate: 86400, // 24 hours
        tags: ["transporters_dashboard"],
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch transporters:", response.status, response.statusText)
      return []
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching transporters:", error)
    return []
  }
}

export default async function TransportersPage() {
  const headersList = await headers()
  const cookie = headersList.get("cookie") || ""

  const transporters = await getTransporters(cookie)

  return <Transporters transporters={transporters} />
}
