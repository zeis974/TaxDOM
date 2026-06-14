import { createFileRoute } from "@tanstack/react-router"
import type { Product } from "@taxdom/types"
import { Suspense } from "react"
import Products from "@/components/Dashboard/Products"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import { ErrorComponent } from "@/components/ErrorComponent"
import { api, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/products")({
  loader: async () => {
    const result = await queryClient.ensureQueryData(api.products.index.queryOptions())
    return { products: (result as { data?: Product[] })?.data ?? [] }
  },
  errorComponent: ErrorComponent,
  component: ProductsPage,
})

function ProductsPage() {
  const { products } = Route.useLoaderData()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Products products={products} />
    </Suspense>
  )
}
