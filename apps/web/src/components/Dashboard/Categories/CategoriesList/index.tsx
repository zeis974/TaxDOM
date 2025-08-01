import type { Category } from "@taxdom/types"
import { use } from "react"

import TaxBar from "@/components/Dashboard/Categories/CategoriesList/TaxBar"

import { CategoriesContainer, CategoryCard, Container, NoCategories } from "./CategoriesList.styled"

export default function CategoriesList({ categories }: { categories: Promise<Category[]> }) {
  const allCategories = use(categories)

  return (
    <Container>
      {allCategories.length === 0 ? (
        <NoCategories>
          <span>Aucune catégorie trouvé</span>
        </NoCategories>
      ) : (
        <CategoriesContainer>
          {allCategories.map((category) => (
            <CategoryCard key={category.categoryID}>
              <h3>{category.name}</h3>
              {category.taxes && <TaxBar taxes={category.taxes} />}
              <p>4 produits liés</p>
            </CategoryCard>
          ))}
        </CategoriesContainer>
      )}
    </Container>
  )
}
