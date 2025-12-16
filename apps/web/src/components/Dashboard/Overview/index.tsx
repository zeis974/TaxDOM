import type { DashboardStats, RecentProduct, TopOrigin, TopTerritory } from "@/types/dashboard"

import RecentActivity from "./RecentActivity"
import StatsCard from "./StatsCard"
import TopItems from "./TopItems"

import { Container, ContentGrid, LeftColumn, RightColumn, StatsGrid } from "./Overview.styled"

export default async function Overview() {
  const [stats, recentProducts, topOrigins, topTerritories] = await Promise.all([
    fetch(`${process.env.API_URL}/dashboard/products/count`, {
      headers: { Authorization: `Bearer ${process.env.API_KEY}` },
      next: { revalidate: 3600, tags: ["count:products"] },
    })
      .then((res) => res.json())
      .then(async (products) => {
        const [categories, origins, territories] = await Promise.all([
          fetch(`${process.env.API_URL}/dashboard/categories/count`, {
            headers: { Authorization: `Bearer ${process.env.API_KEY}` },
            next: { revalidate: 3600, tags: ["count:categories"] },
          }).then((res) => res.json()),
          fetch(`${process.env.API_URL}/dashboard/origins/count`, {
            headers: { Authorization: `Bearer ${process.env.API_KEY}` },
            next: { revalidate: 3600, tags: ["count:origins"] },
          }).then((res) => res.json()),
          fetch(`${process.env.API_URL}/dashboard/territories/count`, {
            headers: { Authorization: `Bearer ${process.env.API_KEY}` },
            next: { revalidate: 3600, tags: ["count:territories"] },
          }).then((res) => res.json()),
        ])
        return {
          products_count: products.products_count,
          categories_count: categories.categories_count,
          origins_count: origins.origins_count,
          territories_count: territories.territories_count,
        } as DashboardStats
      }),

    // Recent products
    fetch(`${process.env.API_URL}/dashboard/products/recent`, {
      headers: { Authorization: `Bearer ${process.env.API_KEY}` },
      next: { revalidate: 300, tags: ["recent:products"] },
    })
      .then((res) => res.json())
      .then((data) => data.recent_products as RecentProduct[])
      .catch(() => [] as RecentProduct[]),

    // Top origins
    fetch(`${process.env.API_URL}/dashboard/origins/top`, {
      headers: { Authorization: `Bearer ${process.env.API_KEY}` },
      next: { revalidate: 3600, tags: ["top:origins"] },
    })
      .then((res) => res.json())
      .then((data) => data.top_origins as TopOrigin[])
      .catch(() => [] as TopOrigin[]),

    // Top territories
    fetch(`${process.env.API_URL}/dashboard/territories/top`, {
      headers: { Authorization: `Bearer ${process.env.API_KEY}` },
      next: { revalidate: 3600, tags: ["top:territories"] },
    })
      .then((res) => res.json())
      .then((data) => data.top_territories as TopTerritory[])
      .catch(() => [] as TopTerritory[]),
  ])

  return (
    <Container>
      <StatsGrid>
        <StatsCard title="Produits" value={stats.products_count} />
        <StatsCard title="Catégories" value={stats.categories_count} />
        <StatsCard title="Origines" value={stats.origins_count} />
        <StatsCard title="Territoires" value={stats.territories_count} />
      </StatsGrid>
      <ContentGrid>
        <LeftColumn>
          <RecentActivity products={recentProducts} />
        </LeftColumn>
        <RightColumn>
          <TopItems type="origins" items={topOrigins} />
          <TopItems type="territories" items={topTerritories} />
        </RightColumn>
      </ContentGrid>
    </Container>
  )
}
