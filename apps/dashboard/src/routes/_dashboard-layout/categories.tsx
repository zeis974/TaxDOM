import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import type { Category } from "@taxdom/types"
import { CategoriesGridSkeleton } from "@/components/Dashboard/Categories/Skeletons"
import AddCategory from "@/components/Dashboard/Categories/AddCategory"
import CategoryCard from "@/components/Dashboard/Categories/CategoryCard"
import { ErrorComponent } from "@/components/ErrorComponent"
import { EntityList, PageContainer, PageHeader } from "@/components/shared"
import { api, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/categories")({
  loader: () => {
    void queryClient.prefetchQuery(api.categories.index.queryOptions())
  },
  errorComponent: ErrorComponent,
  component: CategoriesPage,
})

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

function CategoriesPage() {
  const { data } = useQuery(api.categories.index.queryOptions())
  const count = (data as Category[] | undefined)?.length

  return (
    <PageContainer>
      <PageHeader
        title="Gestion des catégories"
        count={count}
        countLabel="catégories"
        actions={<AddCategory />}
      />
      <Suspense fallback={<CategoriesGridSkeleton />}>
        <CategoriesContent />
      </Suspense>
    </PageContainer>
  )
}

function CategoriesContent() {
  const { data } = useSuspenseQuery(api.categories.index.queryOptions())
  const categories = data as unknown as Category[]

  return (
    <EntityList
      items={categories}
      getKey={(category) => category.categoryID}
      renderItem={(category) => <CategoryCard category={category} editable />}
      emptyIcon={EmptyIcon}
      emptyTitle="Aucune catégorie disponible"
      emptyDescription="Ajoutez votre première catégorie en cliquant sur le bouton ci-dessus."
    />
  )
}
