import type { Metadata } from "next"

import Origins from "@/components/Dashboard/Origins"
import type { Origin } from "@taxdom/types"

export const metadata: Metadata = {
  title: "Origines | Dashboard",
}

export default async function OriginsPage() {
  const response = await fetch(
    `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/dashboard/origins`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 86400, // 24 hours
      },
    },
  )

  const origins: Origin[] = await response.json()

  return <Origins origins={origins} />
}
