import { SkeletonRect } from "@/components/shared/Skeletons"
import { Container, ContentGrid, LeftColumn, RightColumn, StatsGrid } from "./Overview.styled"
import { Card as StatsCardContainer } from "./StatsCard/StatsCard.styled"
import {
  Container as RecentContainer,
  Header as RecentHeader,
  ProductList,
  ProductItem,
} from "./RecentActivity/RecentActivity.styled"
import {
  Container as TopContainer,
  Header as TopHeader,
  List as TopList,
  ListItem as TopListItem,
} from "./TopItems/TopItems.styled"

const DELAYED_FADE = "fadeIn 0.2s ease-out 180ms both"

function StatsCardSkeleton() {
  return (
    <StatsCardContainer aria-hidden="true">
      <SkeletonRect style={{ width: "55%", height: 12 }} />
      <SkeletonRect style={{ width: "35%", height: 28, marginTop: 8 }} />
    </StatsCardContainer>
  )
}

function RecentActivitySkeleton() {
  return (
    <RecentContainer aria-hidden="true">
      <RecentHeader>
        <SkeletonRect style={{ width: 140, height: 16 }} />
        <SkeletonRect style={{ width: 110, height: 12 }} />
      </RecentHeader>
      <ProductList>
        {Array.from({ length: 5 }, (_, i) => (
          <ProductItem key={i}>
            <div className="product-info">
              <SkeletonRect style={{ width: 150, height: 13 }} />
              <div className="meta" style={{ display: "flex", gap: 8 }}>
                <SkeletonRect style={{ width: 60, height: 11 }} />
                <SkeletonRect style={{ width: 60, height: 11 }} />
              </div>
            </div>
            <SkeletonRect style={{ width: 40, height: 11 }} />
          </ProductItem>
        ))}
      </ProductList>
    </RecentContainer>
  )
}

function TopItemsSkeleton() {
  return (
    <TopContainer aria-hidden="true">
      <TopHeader>
        <SkeletonRect style={{ width: 110, height: 16 }} />
        <SkeletonRect style={{ width: 70, height: 12 }} />
      </TopHeader>
      <TopList>
        {Array.from({ length: 5 }, (_, i) => (
          <TopListItem key={i}>
            <div className="rank">
              <SkeletonRect style={{ width: 16, height: 16, borderRadius: 3 }} />
            </div>
            <div className="info">
              <SkeletonRect style={{ width: "65%", height: 13 }} />
              <SkeletonRect style={{ width: "40%", height: 11 }} />
            </div>
            <div className="value" style={{ display: "flex", justifyContent: "flex-end" }}>
              <SkeletonRect style={{ width: 28, height: 14 }} />
            </div>
          </TopListItem>
        ))}
      </TopList>
    </TopContainer>
  )
}

export function OverviewSkeleton() {
  return (
    <Container aria-hidden="true" style={{ animation: DELAYED_FADE }}>
      <StatsGrid>
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </StatsGrid>
      <ContentGrid>
        <LeftColumn>
          <RecentActivitySkeleton />
        </LeftColumn>
        <RightColumn>
          <TopItemsSkeleton />
          <TopItemsSkeleton />
        </RightColumn>
      </ContentGrid>
    </Container>
  )
}
