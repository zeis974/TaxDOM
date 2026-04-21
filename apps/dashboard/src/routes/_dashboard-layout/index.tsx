import { createFileRoute } from "@tanstack/react-router"
import Overview from "@/components/Dashboard/Overview"
import { client, queryClient } from "@/lib/api"

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
  available: boolean
}

export const Route = createFileRoute("/_dashboard-layout/")({
  loader: async () => {
    const productsCount = await queryClient.ensureQueryData({
      queryKey: ["dashboard-stats-products"],
      queryFn: async () => client.api.products.count({}),
      staleTime: 1000 * 60 * 60,
    })
    const categoriesCount = await queryClient.ensureQueryData({
      queryKey: ["dashboard-stats-categories"],
      queryFn: async () => client.api.categories.count({}),
      staleTime: 1000 * 60 * 60,
    })
    const originsCount = await queryClient.ensureQueryData({
      queryKey: ["dashboard-stats-origins"],
      queryFn: async () => client.api.origins.count({}),
      staleTime: 1000 * 60 * 60,
    })
    const territoriesCount = await queryClient.ensureQueryData({
      queryKey: ["dashboard-stats-territories"],
      queryFn: async () => client.api.territories.count({}),
      staleTime: 1000 * 60 * 60,
    })
    const recentProducts = await queryClient.ensureQueryData({
      queryKey: ["dashboard-recent-products"],
      queryFn: async () => {
        const data = await client.api.products.recent({})
        return (
          Array.isArray(data) ? data : ((data as Record<string, unknown>).recent_products ?? [])
        ) as RecentProduct[]
      },
      staleTime: 1000 * 60 * 5,
    })
    const topOrigins = await queryClient.ensureQueryData({
      queryKey: ["dashboard-top-origins"],
      queryFn: async () => {
        const data = await client.api.origins.top({})
        return (
          Array.isArray(data) ? data : ((data as Record<string, unknown>).top_origins ?? [])
        ) as TopOrigin[]
      },
      staleTime: 1000 * 60 * 60,
    })
    const topTerritories = await queryClient.ensureQueryData({
      queryKey: ["dashboard-top-territories"],
      queryFn: async () => {
        const data = await client.api.territories.top({})
        return (
          Array.isArray(data) ? data : ((data as Record<string, unknown>).top_territories ?? [])
        ) as TopTerritory[]
      },
      staleTime: 1000 * 60 * 60,
    })

    return {
      stats: {
        products_count: (productsCount as Record<string, number>).products_count ?? 0,
        categories_count: (categoriesCount as Record<string, number>).categories_count ?? 0,
        origins_count: (originsCount as Record<string, number>).origins_count ?? 0,
        territories_count: (territoriesCount as Record<string, number>).territories_count ?? 0,
      } as DashboardStats,
      recentProducts: recentProducts as RecentProduct[],
      topOrigins: topOrigins as TopOrigin[],
      topTerritories: topTerritories as TopTerritory[],
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
