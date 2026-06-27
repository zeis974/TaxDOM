import { CardHeader, ClickableCard } from "@/components/shared/Card.styled"
import { ListContainer, ListGrid } from "@/components/shared/List.styled"
import { DELAYED_FADE, SkeletonRect } from "@/components/shared/Skeletons"

function ProductCardSkeleton() {
  return (
    <ClickableCard disabled aria-hidden="true" style={{ animation: DELAYED_FADE }}>
      <CardHeader>
        <SkeletonRect style={{ height: 20 }} />
        <SkeletonRect style={{ width: 88, height: 22, borderRadius: 999, flexShrink: 0 }} />
      </CardHeader>
      <SkeletonRect style={{ width: "55%", height: 14 }} />
    </ClickableCard>
  )
}

export function ProductListSkeleton() {
  return (
    <ListContainer aria-hidden="true">
      <ListGrid>
        {Array.from({ length: 8 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </ListGrid>
    </ListContainer>
  )
}
