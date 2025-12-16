import { Suspense } from "react"

import { getAllProducts } from "@/actions/products/getAllProducts"

import AddProduct from "@/components/Dashboard/Products/AddProduct"
import ProductsList from "@/components/Dashboard/Products/ProductsList"
import ProductsSkeleton from "@/components/Dashboard/Products/ProductsSkeleton"
import { ErrorBoundary } from "@/components/shared/ErrorBoundary"

import { Container, Header } from "./Products.styled"

export default async function Products() {
  const products = getAllProducts()

  return (
    <Container>
      <Header>
        <h1>Gestion des produits</h1>
        <AddProduct />
      </Header>
      <ErrorBoundary>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsList products={products} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}
