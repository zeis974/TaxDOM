import type { RecentProduct } from "@/types/dashboard"
import { Container, Header, ProductItem, ProductList, NoActivity } from "./RecentActivity.styled"

interface RecentActivityProps {
  products: RecentProduct[]
}

export default function RecentActivity({ products }: RecentActivityProps) {
  if (!products || products.length === 0) {
    return (
      <Container>
        <Header>
          <h2>Activité récente</h2>
        </Header>
        <NoActivity>
          <span>Aucune activité récente</span>
        </NoActivity>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <h2>Activité récente</h2>
        <span>{products.length} produits récents</span>
      </Header>
      <ProductList>
        {products.map((product) => (
          <ProductItem key={product.productID}>
            <div className="product-info">
              <h3>{product.productName}</h3>
              <div className="meta">
                <span className="category">{product.category.categoryName}</span>
                <span className="separator">•</span>
                <span className="origin">{product.origin.originName}</span>
              </div>
            </div>
            <span className="date">
              {new Date(product.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  )
}
