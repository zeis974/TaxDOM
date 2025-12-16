import type { Metadata } from "next"

import Overview from "@/components/Dashboard/Overview"

export const metadata: Metadata = {
  title: "Dashboard | TaxDOM",
}

export default function DashboardPage() {
  return <Overview />
}
