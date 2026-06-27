import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import { useSuspenseQueries } from "@tanstack/react-query"
import Overview from "@/components/Dashboard/Overview"
import { OverviewSkeleton } from "@/components/Dashboard/Overview/Skeletons"
import { ErrorComponent } from "@/components/ErrorComponent"
import { api, queryClient } from "@/lib/api"

interface DashboardStats {
  products_count: number
  categories_count: number
  origins_count: number
  territories_count: number
}

interface RecentProduct {
  productID: string
  productName: string
  category: { categoryName: string }
  origin: { originName: string }
  createdAt: string
}

interface TopOrigin {
  originID: string
  originName: string
  productsCount: number
  isEU: boolean
}

interface TopTerritory {
  territoryID: string
  territoryName: string
  productsCount: number
}

export const Route = createFileRoute("/_dashboard-layout/")({
  loader: () => {
    void queryClient.prefetchQuery(api.products.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }))
    void queryClient.prefetchQuery(api.categories.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }))
    void queryClient.prefetchQuery(api.origins.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }))
    void queryClient.prefetchQuery(api.territories.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }))
    void queryClient.prefetchQuery(api.products.recent.queryOptions({}, { staleTime: 1000 * 60 * 5 }))
    void queryClient.prefetchQuery(api.origins.top.queryOptions({}, { staleTime: 1000 * 60 * 60 }))
    void queryClient.prefetchQuery(api.territories.top.queryOptions({}, { staleTime: 1000 * 60 * 60 }))
  },
  errorComponent: ErrorComponent,
  component: OverviewPage,
})

function OverviewPage() {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <OverviewContent />
    </Suspense>
  )
}

function OverviewContent() {
  const [
    { data: productsCount },
    { data: categoriesCount },
    { data: originsCount },
    { data: territoriesCount },
    { data: recentProductsRaw },
    { data: topOriginsRaw },
    { data: topTerritoriesRaw },
  ] = useSuspenseQueries({
    queries: [
      api.products.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
      api.categories.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
      api.origins.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
      api.territories.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
      api.products.recent.queryOptions({}, { staleTime: 1000 * 60 * 5 }),
      api.origins.top.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
      api.territories.top.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
    ],
  })

  const stats: DashboardStats = {
    products_count: (productsCount as Record<string, number>)?.products_count ?? 0,
    categories_count: (categoriesCount as Record<string, number>)?.categories_count ?? 0,
    origins_count: (originsCount as Record<string, number>)?.origins_count ?? 0,
    territories_count: (territoriesCount as Record<string, number>)?.territories_count ?? 0,
  }

  const recentProductsArray = Array.isArray(recentProductsRaw)
    ? recentProductsRaw
    : (((recentProductsRaw as Record<string, unknown>)?.recent_products ?? []) as Array<{
        productID: string
        productName: string
        categoryName?: string
        originName?: string
        createdAt?: string | Date | null
      }>)
  const recentProducts: RecentProduct[] = recentProductsArray.map((p) => ({
    productID: p.productID,
    productName: p.productName,
    category: { categoryName: p.categoryName ?? "" },
    origin: { originName: p.originName ?? "" },
    createdAt:
      typeof p.createdAt === "string"
        ? p.createdAt
        : p.createdAt instanceof Date
          ? p.createdAt.toISOString()
          : "",
  }))

  const topOrigins = (
    Array.isArray(topOriginsRaw)
      ? topOriginsRaw
      : ((topOriginsRaw as Record<string, unknown>)?.top_origins ?? [])
  ) as TopOrigin[]

  const topTerritories = (
    Array.isArray(topTerritoriesRaw)
      ? topTerritoriesRaw
      : ((topTerritoriesRaw as Record<string, unknown>)?.top_territories ?? [])
  ) as TopTerritory[]

  return (
    <Overview
      stats={stats}
      recentProducts={recentProducts}
      topOrigins={topOrigins}
      topTerritories={topTerritories}
    />
  )
}
