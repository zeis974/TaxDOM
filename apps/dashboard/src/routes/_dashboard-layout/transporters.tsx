import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import Transporters from "@/components/Dashboard/Transporters"
import { ErrorComponent } from "@/components/ErrorComponent"
import { api, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/transporters")({
  loader: async () => {
    const transporters = await queryClient.ensureQueryData(api.transporters.index.queryOptions())
    return { transporters }
  },
  errorComponent: ErrorComponent,
  component: TransportersPage,
})

function TransportersPage() {
  const { transporters } = Route.useLoaderData()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Transporters transporters={transporters} />
    </Suspense>
  )
}
