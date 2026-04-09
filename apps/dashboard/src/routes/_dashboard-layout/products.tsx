import { createFileRoute } from "@tanstack/react-router"
import type { Product, SelectOption } from "@taxdom/types"
import { Suspense } from "react"
import { ErrorComponent } from "@/components/ErrorComponent"
import Products from "@/components/Dashboard/Products"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import { fetchAPI } from "@/lib/api"

interface FormData {
  categories: SelectOption[]
  origins: SelectOption[]
  territories: SelectOption[]
  flux: SelectOption[]
  taxes: { taxID: string; tva: number; om: number; omr: number }[]
}

export const Route = createFileRoute("/_dashboard-layout/products")({
  loader: async ({ context }) => {
    const [products, formData] = await Promise.all([
      context.queryClient.ensureQueryData<Product[]>({
        queryKey: ["products"],
        queryFn: () => fetchAPI<Product[]>("/v1/admin/products"),
      }),
      context.queryClient.ensureQueryData<FormData>({
        queryKey: ["productFormData"],
        queryFn: () =>
          fetchAPI<FormData>("/v1/admin/products", {
            method: "POST",
            body: JSON.stringify({ action: "getFormData" }),
          }),
      }),
    ])

    return { products, formData }
  },
  onError: ({ error }) => {
    console.error("Products route loader failed:", error)
  },
  errorComponent: ErrorComponent,
  component: ProductsPage,
})

function ProductsPage() {
  const { products, formData } = Route.useLoaderData()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Products products={products} formData={formData} />
    </Suspense>
  )
}
