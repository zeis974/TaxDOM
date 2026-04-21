import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import Origins from "@/components/Dashboard/Origins"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import { client, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/origins")({
  loader: async () => {
    const origins = await queryClient.ensureQueryData({
      queryKey: ["origins"],
      queryFn: async () => client.api.origins.index({}),
    })
    return { origins }
  },
  component: OriginsPage,
})

function OriginsPage() {
  const { origins } = Route.useLoaderData()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Origins origins={origins} />
    </Suspense>
  )
}
