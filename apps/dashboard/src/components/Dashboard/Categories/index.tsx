import type { Category } from "@taxdom/types"
import { EntityList, PageContainer, PageHeader } from "@/components/shared"
import AddCategory from "./AddCategory"
import CategoryCard from "./CategoryCard"

interface CategoriesProps {
  categories: Category[]
}

const EmptyIcon = (
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
      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
)

export default function Categories({ categories }: CategoriesProps) {
  return (
    <PageContainer>
      <PageHeader
        title="Gestion des catégories"
        count={categories.length}
        countLabel="catégories"
        actions={<AddCategory />}
      />
      <EntityList
        items={categories}
        getKey={(category) => category.categoryID}
        renderItem={(category) => <CategoryCard category={category} editable />}
        emptyIcon={EmptyIcon}
        emptyTitle="Aucune catégorie disponible"
        emptyDescription="Ajoutez votre première catégorie en cliquant sur le bouton ci-dessus."
      />
    </PageContainer>
  )
}
