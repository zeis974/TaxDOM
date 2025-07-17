import { LoadingContainer, ProductCardSkeleton } from "./ProductsSkeleton.styled"

export default function ProductsSkeleton() {
  return (
    <LoadingContainer>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </LoadingContainer>
  )
}
