import { LoadingFallbackContainer } from "./LoadingFallback.styled"

interface LoadingFallbackProps {
  message?: string
}

export default function LoadingFallback({ message = "Chargement..." }: LoadingFallbackProps) {
  return <LoadingFallbackContainer>{message}</LoadingFallbackContainer>
}
