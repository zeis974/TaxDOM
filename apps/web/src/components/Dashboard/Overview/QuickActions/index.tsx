import Link from "next/link"
import { Container, ActionButton, ActionGrid } from "./QuickActions.styled"

export default function QuickActions() {
  const actions = [
    {
      title: "Ajouter un produit",
      href: "/dashboard/products",
    },
    {
      title: "Nouvelle catégorie",
      href: "/dashboard/categories",
    },
    {
      title: "Nouvelle origine",
      href: "/dashboard/origins",
    },
    {
      title: "Nouveau territoire",
      href: "/dashboard/territories",
    },
  ]

  return (
    <Container>
      <h2>Actions rapides</h2>
      <ActionGrid>
        {actions.map((action) => (
          <Link key={action.title} href={action.href as any}>
            <ActionButton>
              <span>{action.title}</span>
            </ActionButton>
          </Link>
        ))}
      </ActionGrid>
    </Container>
  )
}
