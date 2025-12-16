import Categories from "@/components/Dashboard/Categories"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catégories | Dashboard",
}

export default function CategoriesPage() {
  return <Categories />
}
