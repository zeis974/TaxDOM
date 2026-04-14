import { createFileRoute } from "@tanstack/react-router"
import type { Category } from "@taxdom/types"
import { Suspense } from "react"
import Categories from "@/components/Dashboard/Categories"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import { fetchAPI } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/categories")({
  loader: async ({ context }) => {
    const categories = await context.queryClient.ensureQueryData<Category[]>({
      queryKey: ["categories"],
      queryFn: () => fetchAPI("/v1/admin/categories"),
    })

    return { categories }
  },
  component: CategoriesPage,
})

function CategoriesPage() {
  const { categories } = Route.useLoaderData()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Categories categories={categories} />
    </Suspense>
  )
}
