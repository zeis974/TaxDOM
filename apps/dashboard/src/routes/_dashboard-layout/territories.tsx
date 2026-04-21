import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import Territories from "@/components/Dashboard/Territories"
import { client, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/territories")({
  loader: async () => {
    const territories = await queryClient.ensureQueryData({
      queryKey: ["territories"],
      queryFn: async () => client.api.territories.index({}),
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
