import type { Metadata } from "next"
import { headers } from "next/headers"

import Territories from "@/components/Dashboard/Territories"
import type { Territory } from "@taxdom/types"

export const metadata: Metadata = {
  title: "Territoires | Dashboard",
}

export default async function TerritoriesPage() {
  const headersList = await headers()
  const cookie = headersList.get("cookie") || ""

  const response = await fetch(`${process.env.API_URL}/dashboard/territories`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    next: {
      revalidate: 86400, // 24 hours
      tags: ["territories_dashboard"],
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch territories")
  }

  const territories: Territory[] = await response.json()

  return <Territories territories={territories} />
}
