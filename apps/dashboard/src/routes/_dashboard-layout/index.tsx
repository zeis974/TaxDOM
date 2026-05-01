import { createFileRoute } from "@tanstack/react-router"
import Overview from "@/components/Dashboard/Overview"
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
  loader: async () => {
    const productsCount = await queryClient.ensureQueryData(
      api.products.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
    )
    const categoriesCount = await queryClient.ensureQueryData(
      api.categories.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
    )
    const originsCount = await queryClient.ensureQueryData(
      api.origins.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
    )
    const territoriesCount = await queryClient.ensureQueryData(
      api.territories.count.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
    )

    const recentProductsRaw = await queryClient.ensureQueryData(
      api.products.recent.queryOptions({}, { staleTime: 1000 * 60 * 5 }),
    )
    const recentProductsArray = Array.isArray(recentProductsRaw)
      ? recentProductsRaw
      : (((recentProductsRaw as Record<string, unknown>).recent_products ?? []) as Array<{
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

    const topOriginsRaw = await queryClient.ensureQueryData(
      api.origins.top.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
    )
    const topOrigins = (
      Array.isArray(topOriginsRaw)
        ? topOriginsRaw
        : ((topOriginsRaw as Record<string, unknown>).top_origins ?? [])
    ) as TopOrigin[]

    const topTerritoriesRaw = await queryClient.ensureQueryData(
      api.territories.top.queryOptions({}, { staleTime: 1000 * 60 * 60 }),
    )
    const topTerritories = (
      Array.isArray(topTerritoriesRaw)
        ? topTerritoriesRaw
        : ((topTerritoriesRaw as Record<string, unknown>).top_territories ?? [])
    ) as TopTerritory[]

    return {
      stats: {
        products_count: (productsCount as Record<string, number>).products_count ?? 0,
        categories_count: (categoriesCount as Record<string, number>).categories_count ?? 0,
        origins_count: (originsCount as Record<string, number>).origins_count ?? 0,
        territories_count: (territoriesCount as Record<string, number>).territories_count ?? 0,
      } as DashboardStats,
      recentProducts,
      topOrigins,
      topTerritories,
    }
  },
  component: OverviewPage,
})

function OverviewPage() {
  const { stats, recentProducts, topOrigins, topTerritories } = Route.useLoaderData()

  return (
    <Overview
      stats={stats}
      recentProducts={recentProducts}
      topOrigins={topOrigins}
      topTerritories={topTerritories}
    />
  )
}
