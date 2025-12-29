import type { Metadata } from "next"
import { headers } from "next/headers"

import Origins from "@/components/Dashboard/Origins"
import type { Origin } from "@taxdom/types"

export const metadata: Metadata = {
  title: "Origines | Dashboard",
}

export default async function OriginsPage() {
  const headersList = await headers()
  const cookie = headersList.get("cookie") || ""

  const response = await fetch(`${process.env.API_URL}/dashboard/origins`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    next: {
      revalidate: 86400, // 24 hours
      tags: ["origins_dashboard"],
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch origins")
  }

  const origins: Origin[] = await response.json()

  return <Origins origins={origins} />
}
