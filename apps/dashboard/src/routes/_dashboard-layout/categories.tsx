import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import Categories from "@/components/Dashboard/Categories"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import { client, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/categories")({
  loader: async () => {
    const categories = await queryClient.ensureQueryData({
      queryKey: ["categories"],
      queryFn: async () => client.api.categories.index({}),
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
