import type { Product, SelectOption } from "@taxdom/types"
import AddProduct from "./AddProduct"
import ProductsList from "./ProductsList"

import { Container, Header, HeaderActions, HeaderTitle } from "./Products.styled"

interface FormData {
  categories: SelectOption[]
  origins: SelectOption[]
  territories: SelectOption[]
  flux: SelectOption[]
  taxes: { taxID: string; tva: number; om: number; omr: number }[]
}

interface ProductsProps {
  products: Product[]
  formData: FormData
}

export default function Products({ products, formData }: ProductsProps) {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des produits</h2>
          <span>{products.length} produits</span>
        </HeaderTitle>
        <HeaderActions>
          <AddProduct formData={formData} />
        </HeaderActions>
      </Header>
      <ProductsList products={products} formData={formData} />
    </Container>
  )
}
