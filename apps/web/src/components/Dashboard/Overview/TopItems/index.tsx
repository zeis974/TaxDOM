import type { TopOrigin, TopTerritory } from "@/types/dashboard"
import { Container, Header, ListItem, List, NoData } from "./TopItems.styled"

interface TopItemsProps {
  type: "origins" | "territories"
  items: TopOrigin[] | TopTerritory[]
}

export default function TopItems({ type, items }: TopItemsProps) {
  const title = type === "origins" ? "Top Origines" : "Top Territoires"

  if (!items || items.length === 0) {
    return (
      <Container>
        <Header>
          <h2>{title}</h2>
        </Header>
        <NoData>Aucune donnée disponible</NoData>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <h2>{title}</h2>
        <span>{items.length} éléments</span>
      </Header>
      <List>
        {items.map((item, index) => {
          const name =
            type === "origins"
              ? (item as TopOrigin).originName
              : (item as TopTerritory).territoryName
          const count = item.productsCount

          return (
            <ListItem
              key={
                type === "origins"
                  ? (item as TopOrigin).originID
                  : (item as TopTerritory).territoryID
              }
            >
              <div className="rank">{index + 1}</div>
              <div className="info">
                <span className="name">{name}</span>
                <span className="count">{count} produits</span>
              </div>
              <div className="value">{count}</div>
            </ListItem>
          )
        })}
      </List>
    </Container>
  )
}
