import {
  Container,
  Header,
  HeaderTitle,
  HeaderActions,
} from "@/components/Dashboard/Categories/Categories.styled"
import {
  SkeletonButton,
  SkeletonCard,
  SkeletonContainer,
} from "@/components/Dashboard/Origins/OriginsList/OriginsListSkeleton.styled"

export default function Loading() {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des catégories</h2>
          <span>Chargement...</span>
        </HeaderTitle>
        <HeaderActions>
          <SkeletonButton data-variant="filter">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M7 12h10m-7 6h4" />
            </svg>
            Filtrer
          </SkeletonButton>
          <SkeletonButton data-variant="primary">Ajouter une catégorie</SkeletonButton>
        </HeaderActions>
      </Header>
      <SkeletonContainer data-loading="true">
        {Array.from({ length: 12 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items are static
          <SkeletonCard key={index}>
            <div className="skeleton-header">
              <div className="skeleton-title" />
              <div className="skeleton-badges">
                <div className="skeleton-badge skeleton-badge-md" />
              </div>
            </div>
            <div className="skeleton-count" />
          </SkeletonCard>
        ))}
      </SkeletonContainer>
    </Container>
  )
}
