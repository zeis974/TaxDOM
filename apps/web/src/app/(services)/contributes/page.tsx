import type { Metadata } from "next"
import Contributes from "@/components/Contributes"

export const metadata: Metadata = {
  title: "Contribuer au projet",
}

export default function ContributesPage() {
  return <Contributes />
}
