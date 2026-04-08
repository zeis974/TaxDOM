import type { ErrorComponentProps } from "@tanstack/react-router"
import { ErrorContainer, ErrorMessage, ErrorTitle, RetryButton } from "./ErrorComponent.styled"

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <ErrorContainer>
      <ErrorTitle>Une erreur est survenue</ErrorTitle>
      <ErrorMessage>{error?.message ?? "Erreur inattendue"}</ErrorMessage>
      <RetryButton type="button" onClick={reset}>
        Réessayer
      </RetryButton>
    </ErrorContainer>
  )
}
