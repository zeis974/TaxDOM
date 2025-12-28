import OriginsListSkeleton from "@/components/Dashboard/Origins/OriginsList/OriginsListSkeleton"
import {
  Container,
  Header,
  HeaderTitle,
  HeaderActions,
} from "@/components/Dashboard/Origins/Origins.styled"
import { SkeletonButton } from "@/components/Dashboard/Origins/OriginsList/OriginsListSkeleton.styled"

export default function Loading() {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des origines</h2>
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
          <SkeletonButton data-variant="primary">Ajouter une origine</SkeletonButton>
        </HeaderActions>
      </Header>
      <OriginsListSkeleton />
    </Container>
  )
}
