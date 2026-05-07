import type { Product } from "@taxdom/types"
import ProductCard from "@/components/Dashboard/Products/ProductCard"
import { Container, NoProducts, ProductsContainer } from "./ProductsList.styled"

interface ProductsListProps {
  products: Product[]
}

export default function ProductsList({ products }: ProductsListProps) {
  if (products.length === 0) {
    return (
      <Container>
        <NoProducts>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <h3>Aucun produit disponible</h3>
          <p>Ajoutez votre premier produit en cliquant sur le bouton ci-dessus.</p>
        </NoProducts>
      </Container>
    )
  }

  return (
    <Container>
      <ProductsContainer>
        {products.map((product: Product) => (
          <div key={product.productID}>
            <ProductCard product={product} editable />
          </div>
        ))}
      </ProductsContainer>
    </Container>
  )
}
