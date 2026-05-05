import type { Product } from "@taxdom/types"
import AddProduct from "./AddProduct"
import { Container, Header, HeaderActions, HeaderTitle } from "./Products.styled"
import ProductsList from "./ProductsList"

interface ProductsProps {
  products: Product[]
}

export default function Products({ products }: ProductsProps) {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des produits</h2>
          <span>{products.length} produits</span>
        </HeaderTitle>
        <HeaderActions>
          <AddProduct />
        </HeaderActions>
      </Header>
      <ProductsList products={products} />
    </Container>
  )
}
