import { Suspense } from "react"

import { getCategories } from "@/actions/categories/getCategories"

import { ErrorBoundary } from "@/components/shared/ErrorBoundary"
import CategoriesList from "@/components/Dashboard/Categories/CategoriesList"

import { Container, Header } from "./Categories.styled"

export default async function Categories() {
  const categories = getCategories()

  return (
    <Container>
      <Header>
        <h1>Gestion des catégories</h1>
      </Header>
      <ErrorBoundary>
        <Suspense fallback={<p>loading...</p>}>
          <CategoriesList categories={categories} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}
