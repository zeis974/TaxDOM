import { CardHeader, ClickableCard } from "@/components/shared/Card.styled"
import { ListContainer, ListGrid } from "@/components/shared/List.styled"
import { DELAYED_FADE, SkeletonRect } from "@/components/shared/Skeletons"

function TransporterCardSkeleton() {
  return (
    <ClickableCard disabled aria-hidden="true" style={{ animation: DELAYED_FADE }}>
      <CardHeader>
        <SkeletonRect style={{ height: 20 }} />
      </CardHeader>
      <SkeletonRect style={{ width: 68, height: 26, borderRadius: 999, display: "inline-block" }} />
    </ClickableCard>
  )
}

export function TransportersGridSkeleton() {
  return (
    <ListContainer aria-hidden="true">
      <ListGrid>
        {Array.from({ length: 8 }, (_, i) => (
          <TransporterCardSkeleton key={i} />
        ))}
      </ListGrid>
    </ListContainer>
  )
}
