import type { Metadata } from "next"

import Products from "@/components/Dashboard/Products"

export const metadata: Metadata = {
  title: "Produits | Dashboard",
}

export default function ProductsPage() {
  return <Products />
}
