import type { Metadata } from "next"
import { headers } from "next/headers"

import Products from "@/components/Dashboard/Products"
import type { Product } from "@taxdom/types"
import { getProductFormData } from "@/actions/products/getProductFormData"

export const metadata: Metadata = {
  title: "Produits | Dashboard",
}

export default async function ProductsPage() {
  const headersList = await headers()
  const cookie = headersList.get("cookie") || ""

  const response = await fetch(`${process.env.API_URL}/dashboard/products`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    next: {
      revalidate: 86400, // 24 hours
      tags: ["products_dashboard"],
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const products: Product[] = await response.json()
  const formData = await getProductFormData()

  return <Products products={products} formData={formData} />
}
