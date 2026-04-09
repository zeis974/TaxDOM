import { createFileRoute } from "@tanstack/react-router"
import type { Origin } from "@taxdom/types"
import { Suspense } from "react"
import Origins from "@/components/Dashboard/Origins"
import LoadingFallback from "@/components/Dashboard/shared/LoadingFallback"
import { fetchAPI } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/origins")({
  loader: async ({ context }) => {
    const origins = await context.queryClient.ensureQueryData<Origin[]>({
      queryKey: ["origins"],
      queryFn: () => fetchAPI("/v1/admin/origins"),
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
