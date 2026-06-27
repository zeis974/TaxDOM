import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import type { Transporter } from "@taxdom/types"
import { TransportersGridSkeleton } from "@/components/Dashboard/Transporters/Skeletons"
import AddTransporter from "@/components/Dashboard/Transporters/AddTransporter"
import TransporterCard from "@/components/Dashboard/Transporters/TransporterCard"
import { ErrorComponent } from "@/components/ErrorComponent"
import { EntityList, PageContainer, PageHeader } from "@/components/shared"
import { api, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/transporters")({
  loader: () => {
    void queryClient.prefetchQuery(api.transporters.index.queryOptions())
  },
  errorComponent: ErrorComponent,
  component: TransportersPage,
})

const EmptyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
    />
  </svg>
)

function TransportersPage() {
  const { data } = useQuery(api.transporters.index.queryOptions())
  const transporters = data as Transporter[] | undefined
  const count = transporters?.length

  return (
    <PageContainer>
      <PageHeader
        title="Gestion des transporteurs"
        count={count}
        countLabel={count !== undefined && count !== 1 ? "transporteurs" : "transporteur"}
        actions={<AddTransporter />}
      />
      <Suspense fallback={<TransportersGridSkeleton />}>
        <TransportersContent />
      </Suspense>
    </PageContainer>
  )
}

function TransportersContent() {
  const { data } = useSuspenseQuery(api.transporters.index.queryOptions())
  const transporters = data as unknown as Transporter[]

  return (
    <EntityList
      items={transporters}
      getKey={(transporter) => transporter.transporterID}
      renderItem={(transporter) => <TransporterCard transporter={transporter} editable />}
      emptyIcon={EmptyIcon}
      emptyTitle="Aucun transporteur disponible"
      emptyDescription="Ajoutez votre premier transporteur en cliquant sur le bouton ci-dessus."
    />
  )
}
