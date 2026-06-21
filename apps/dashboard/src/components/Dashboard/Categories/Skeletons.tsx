import { CardHeader, ClickableCard } from "@/components/shared/Card.styled"
import { ListContainer, ListGrid } from "@/components/shared/List.styled"
import { DELAYED_FADE, SkeletonRect } from "@/components/shared/Skeletons"

function CategoryCardSkeleton() {
  return (
    <ClickableCard disabled aria-hidden="true" style={{ animation: DELAYED_FADE }}>
      <CardHeader>
        <SkeletonRect style={{ height: 20 }} />
        <SkeletonRect style={{ width: 72, height: 22, borderRadius: 999, flexShrink: 0 }} />
      </CardHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SkeletonRect style={{ height: 14, borderRadius: 10 }} />
        <div style={{ display: "flex", gap: 16 }}>
          <SkeletonRect style={{ width: 52, height: 12 }} />
          <SkeletonRect style={{ width: 44, height: 12 }} />
          <SkeletonRect style={{ width: 52, height: 12 }} />
        </div>
      </div>
    </ClickableCard>
  )
}

export function CategoriesGridSkeleton() {
  return (
    <ListContainer aria-hidden="true">
      <ListGrid>
        {Array.from({ length: 8 }, (_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </ListGrid>
    </ListContainer>
  )
}
