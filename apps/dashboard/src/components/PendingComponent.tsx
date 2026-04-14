import { PendingContainer, PendingText, Spinner } from "./PendingComponent.styled"

export function PendingComponent() {
  return (
    <PendingContainer>
      <Spinner />
      <PendingText>Chargement...</PendingText>
    </PendingContainer>
  )
}
