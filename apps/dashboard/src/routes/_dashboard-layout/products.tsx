import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import Products from "@/components/Dashboard/Products"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import { ErrorComponent } from "@/components/ErrorComponent"
import { client, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/products")({
  loader: async () => {
    const products = (await queryClient.ensureQueryData({
      queryKey: ["products"],
      queryFn: async () => client.api.products.index({}),
    })) as import("@taxdom/types").Product[]
    return { products }
  },
  onError: ({ error }) => {
    console.error("Products route loader failed:", error)
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
