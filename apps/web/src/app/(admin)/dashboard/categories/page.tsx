import type { Metadata } from "next"
import { headers } from "next/headers"

import Categories from "@/components/Dashboard/Categories"
import type { Category } from "@taxdom/types"

export const metadata: Metadata = {
  title: "Catégories | Dashboard",
}

export default async function CategoriesPage() {
  const headersList = await headers()
  const cookie = headersList.get("cookie") || ""

  const response = await fetch(`${process.env.API_URL}/dashboard/categories`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    next: {
      revalidate: 86400, // 24 hours
      tags: ["categories_dashboard"],
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  const categories: Category[] = await response.json()

  return <Categories categories={categories} />
}
