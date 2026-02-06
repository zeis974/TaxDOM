import TransportersListSkeleton from "@/components/Dashboard/Transporters/TransportersList/TransportersListSkeleton"
import {
  Container,
  Header,
  HeaderTitle,
  HeaderActions,
} from "@/components/Dashboard/Transporters/Transporters.styled"
import { SkeletonButton } from "@/components/Dashboard/Transporters/TransportersList/TransportersListSkeleton.styled"

export default function Loading() {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des transporteurs</h2>
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
          <SkeletonButton data-variant="primary">Ajouter un transporteur</SkeletonButton>
        </HeaderActions>
      </Header>
      <TransportersListSkeleton />
    </Container>
  )
}
