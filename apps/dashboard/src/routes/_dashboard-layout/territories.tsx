import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import type { Territory } from "@taxdom/types"
import { TerritoriesGridSkeleton } from "@/components/Dashboard/Territories/Skeletons"
import AddTerritory from "@/components/Dashboard/Territories/AddTerritory"
import TerritoryCard from "@/components/Dashboard/Territories/TerritoryCard"
import { ErrorComponent } from "@/components/ErrorComponent"
import { EntityList, PageContainer, PageHeader } from "@/components/shared"
import { api, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/territories")({
  loader: () => {
    void queryClient.prefetchQuery(api.territories.index.queryOptions())
  },
  errorComponent: ErrorComponent,
  component: TerritoriesPage,
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
      d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
    />
  </svg>
)

function TerritoriesPage() {
  const { data } = useQuery(api.territories.index.queryOptions())
  const count = (data as Territory[] | undefined)?.length

  return (
    <PageContainer>
      <PageHeader
        title="Gestion des territoires"
        count={count}
        countLabel="territoires"
        actions={<AddTerritory />}
      />
      <Suspense fallback={<TerritoriesGridSkeleton />}>
        <TerritoriesContent />
      </Suspense>
    </PageContainer>
  )
}

function TerritoriesContent() {
  const { data } = useSuspenseQuery(api.territories.index.queryOptions())
  const territories = data as unknown as Territory[]

  return (
    <EntityList
      items={territories}
      getKey={(territory) => territory.territoryID}
      renderItem={(territory) => <TerritoryCard territory={territory} editable />}
      emptyIcon={EmptyIcon}
      emptyTitle="Aucun territoire disponible"
      emptyDescription="Ajoutez votre premier territoire en cliquant sur le bouton ci-dessus."
    />
  )
}
