import type { Metadata } from "next"

import Settings from "@/components/Settings"

export const metadata: Metadata = {
  title: "Paramètres",
}

export default function SettingsPage() {
  return <Settings />
}
