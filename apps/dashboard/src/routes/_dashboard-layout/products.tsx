import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import type { Product } from "@taxdom/types"
import { Suspense } from "react"
import AddProduct from "@/components/Dashboard/Products/AddProduct"
import ProductCard from "@/components/Dashboard/Products/ProductCard"
import { ProductListSkeleton } from "@/components/Dashboard/Products/Skeletons"
import { ErrorComponent } from "@/components/ErrorComponent"
import { EntityList, PageContainer, PageHeader } from "@/components/shared"
import { api, queryClient } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/products")({
  loader: () => {
    void queryClient.prefetchQuery(api.products.index.queryOptions())
  },
  errorComponent: ErrorComponent,
  component: ProductsPage,
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
      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    />
  </svg>
)

function ProductsPage() {
  const { data } = useQuery(api.products.index.queryOptions())
  const count = (data as { data?: Product[] } | undefined)?.data?.length

  return (
    <PageContainer>
      <PageHeader
        title="Gestion des produits"
        count={count}
        countLabel="produits"
        actions={<AddProduct />}
      />
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductsContent />
      </Suspense>
    </PageContainer>
  )
}

function ProductsContent() {
  const { data } = useSuspenseQuery(api.products.index.queryOptions())
  const products = (data as unknown as { data?: Product[] })?.data ?? []

  return (
    <EntityList
      items={products}
      getKey={(product) => product.productID}
      renderItem={(product) => <ProductCard product={product} editable />}
      emptyIcon={EmptyIcon}
      emptyTitle="Aucun produit disponible"
      emptyDescription="Commencez par ajouter votre premier produit pour le voir apparaître ici."
      emptyAction={<AddProduct />}
    />
  )
}
