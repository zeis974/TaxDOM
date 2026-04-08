import { Container, ContentGrid, LeftColumn, RightColumn, StatsGrid } from "./Overview.styled"
import RecentActivity from "./RecentActivity"
import StatsCard from "./StatsCard"
import TopItems from "./TopItems"

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

interface OverviewProps {
  stats: DashboardStats
  recentProducts: RecentProduct[]
  topOrigins: TopOrigin[]
  topTerritories: TopTerritory[]
}

export default function Overview({
  stats,
  recentProducts,
  topOrigins,
  topTerritories,
}: OverviewProps) {
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
