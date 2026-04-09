import { createFileRoute } from "@tanstack/react-router"
import type { Territory } from "@taxdom/types"
import { Suspense } from "react"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import Territories from "@/components/Dashboard/Territories"
import { fetchAPI } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/territories")({
  loader: async ({ context }) => {
    const territories = await context.queryClient.ensureQueryData<Territory[]>({
      queryKey: ["territories"],
      queryFn: () => fetchAPI("/v1/admin/territories"),
    })

    return { territories }
  },
  component: TerritoriesPage,
})

function TerritoriesPage() {
  const { territories } = Route.useLoaderData()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Territories territories={territories} />
    </Suspense>
  )
}
