import { CardHeader, ClickableCard } from "@/components/shared/Card.styled"
import { ListContainer, ListGrid } from "@/components/shared/List.styled"
import { DELAYED_FADE, SkeletonRect } from "@/components/shared/Skeletons"

function TerritoryCardSkeleton() {
  return (
    <ClickableCard disabled aria-hidden="true" style={{ animation: DELAYED_FADE }}>
      <CardHeader>
        <SkeletonRect style={{ height: 20 }} />
      </CardHeader>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <SkeletonRect style={{ width: 72, height: 26, borderRadius: 999, flexShrink: 0 }} />
        <SkeletonRect style={{ width: "40%", height: 14 }} />
      </div>
    </ClickableCard>
  )
}

export function TerritoriesGridSkeleton() {
  return (
    <ListContainer aria-hidden="true">
      <ListGrid>
        {Array.from({ length: 8 }, (_, i) => (
          <TerritoryCardSkeleton key={i} />
        ))}
      </ListGrid>
    </ListContainer>
  )
}
