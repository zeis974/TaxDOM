import type { Product } from "@taxdom/types"
import { EntityList, PageContainer, PageHeader } from "@/components/Dashboard/shared"
import AddProduct from "./AddProduct"
import ProductCard from "./ProductCard"

interface ProductsProps {
  products: Product[]
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
      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    />
  </svg>
)

export default function Products({ products }: ProductsProps) {
  return (
    <PageContainer>
      <PageHeader
        title="Gestion des produits"
        count={products.length}
        countLabel="produits"
        actions={<AddProduct />}
      />
      <EntityList
        items={products}
        getKey={(product) => product.productID}
        renderItem={(product) => <ProductCard product={product} editable />}
        emptyIcon={EmptyIcon}
        emptyTitle="Aucun produit disponible"
        emptyDescription="Ajoutez votre premier produit en cliquant sur le bouton ci-dessus."
      />
    </PageContainer>
  )
}
