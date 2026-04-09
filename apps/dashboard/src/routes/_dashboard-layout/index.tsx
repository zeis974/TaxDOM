import { createFileRoute } from "@tanstack/react-router"
import Overview from "@/components/Dashboard/Overview"
import { fetchAPI } from "@/lib/api"

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

export interface IndexLoaderData {
  stats: DashboardStats
  recentProducts: RecentProduct[]
  topOrigins: TopOrigin[]
  topTerritories: TopTerritory[]
}

export const Route = createFileRoute("/_dashboard-layout/")({
  loader: async ({ context }) => {
    const [stats, recentProducts, topOrigins, topTerritories] = await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
          const [products, categories, origins, territories] = await Promise.all([
            fetchAPI<{ products_count: number }>("/v1/admin/products/count"),
            fetchAPI<{ categories_count: number }>("/v1/admin/categories/count"),
            fetchAPI<{ origins_count: number }>("/v1/admin/origins/count"),
            fetchAPI<{ territories_count: number }>("/v1/admin/territories/count"),
          ])
          return {
            products_count: products.products_count,
            categories_count: categories.categories_count,
            origins_count: origins.origins_count,
            territories_count: territories.territories_count,
          }
        },
        staleTime: 1000 * 60 * 60,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["dashboard-recent-products"],
        queryFn: () =>
          fetchAPI<{ recent_products: RecentProduct[] }>("/v1/admin/products/recent").then(
            (data) => data.recent_products,
          ),
        staleTime: 1000 * 60 * 5,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["dashboard-top-origins"],
        queryFn: () =>
          fetchAPI<{ top_origins: TopOrigin[] }>("/v1/admin/origins/top").then(
            (data) => data.top_origins,
          ),
        staleTime: 1000 * 60 * 60,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["dashboard-top-territories"],
        queryFn: () =>
          fetchAPI<{ top_territories: TopTerritory[] }>("/v1/admin/territories/top").then(
            (data) => data.top_territories,
          ),
        staleTime: 1000 * 60 * 60,
      }),
    ])

    return {
      stats,
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
