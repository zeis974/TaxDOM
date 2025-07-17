import type { Product } from "@taxdom/types"

import { use } from "react"

import {
  Category,
  Container,
  Flux,
  NoProducts,
  Origin,
  ProductCard,
  ProductContainer,
  ProductHeader,
  Territory,
} from "./ProductsList.styled"

export default function ProductsList({ products }: { products: Promise<Product[]> }) {
  const allProducts = use(products)

  return (
    <Container>
      {allProducts.length === 0 && (
        <NoProducts>
          <span>Aucun produit trouvé</span>
        </NoProducts>
      )}
      <ProductHeader>
        <span>Nom du produit</span>
        <span>Origine</span>
        <span>Flux</span>
        <span>Territoire</span>
        <span>Taxes</span>
      </ProductHeader>
      <ProductContainer>
        {allProducts.map((product) => (
          <ProductCard key={product.name}>
            <div>
              <h3>{product.name}</h3>
              <Category>{product.category}</Category>
            </div>
            <div>
              <Origin>{product.origin}</Origin>
            </div>
            <div>
              <Flux>{product.flux}</Flux>
            </div>
            <div>
              <Territory>{product.territory}</Territory>
            </div>
            <div>
              TVA {product.tax.tva}%, OM {product.tax.om}%, OMR {product.tax.omr}%
            </div>
          </ProductCard>
        ))}
      </ProductContainer>
    </Container>
  )
}
