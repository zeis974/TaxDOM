import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import Categories from "@/components/Dashboard/Categories"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import { ErrorComponent } from "@/components/ErrorComponent"
import { api, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/categories")({
  loader: async () => {
    const categories = await queryClient.ensureQueryData(api.categories.index.queryOptions())
    return { categories }
  },
  errorComponent: ErrorComponent,
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
