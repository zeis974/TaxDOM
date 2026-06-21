import { CardHeader, ClickableCard } from "@/components/shared/Card.styled"
import { ListContainer, ListGrid } from "@/components/shared/List.styled"
import { DELAYED_FADE, SkeletonRect } from "@/components/shared/Skeletons"

function OriginCardSkeleton() {
  return (
    <ClickableCard disabled aria-hidden="true" style={{ animation: DELAYED_FADE }}>
      <CardHeader>
        <SkeletonRect style={{ height: 20 }} />
        <SkeletonRect style={{ width: 48, height: 22, borderRadius: 999, flexShrink: 0 }} />
      </CardHeader>
      <SkeletonRect style={{ width: 80, height: 26, borderRadius: 999, display: "inline-block" }} />
    </ClickableCard>
  )
}

export function OriginsGridSkeleton() {
  return (
    <ListContainer aria-hidden="true">
      <ListGrid>
        {Array.from({ length: 8 }, (_, i) => (
          <OriginCardSkeleton key={i} />
        ))}
      </ListGrid>
    </ListContainer>
  )
}
