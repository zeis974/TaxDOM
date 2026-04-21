import { createFileRoute } from "@tanstack/react-router"
import Transporters from "@/components/Dashboard/Transporters"
import { client, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/transporters")({
  loader: async () => {
    const transporters = await queryClient.ensureQueryData({
      queryKey: ["transporters"],
      queryFn: async () => client.api.transporters.index({}),
    })
    return { transporters }
  },
  component: TransportersPage,
})

function TransportersPage() {
  const { transporters } = Route.useLoaderData()

  return <Transporters transporters={transporters} />
}
