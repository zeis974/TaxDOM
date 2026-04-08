import type { Category } from "@taxdom/types"
import AddCategory from "./AddCategory"
import { Container, Header, HeaderActions, HeaderTitle } from "./Categories.styled"
import CategoriesList from "./CategoriesList"

interface CategoriesProps {
  categories: Category[]
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <Container>
      <Header>
        <HeaderTitle>
          <h2>Gestion des catégories</h2>
          <span>{categories.length} catégories</span>
        </HeaderTitle>
        <HeaderActions>
          <AddCategory />
        </HeaderActions>
      </Header>
      <CategoriesList categories={categories} />
    </Container>
  )
}
