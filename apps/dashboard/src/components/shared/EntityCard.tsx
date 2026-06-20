import type { ReactNode } from "react"
import { BadgeContainer, Card, CardHeader, CardTitle, ClickableCard } from "./Card.styled"

type EntityCardProps = {
  title: string
  badges?: ReactNode
  onClick?: () => void
  children?: ReactNode
}

/**
 * Carte d'entité générique : entête (titre ellipsé + badges) puis contenu libre.
 * Cliquable dès qu'un `onClick` est fourni (ouverture du drawer d'édition).
 */
export function EntityCard({ title, badges, onClick, children }: EntityCardProps) {
  const content = (
    <>
      <CardHeader>
        <CardTitle title={title}>{title}</CardTitle>
        {badges && <BadgeContainer>{badges}</BadgeContainer>}
      </CardHeader>
      {children}
    </>
  )

  if (onClick) {
    return (
      <ClickableCard type="button" onClick={onClick} data-clickable>
        {content}
      </ClickableCard>
    )
  }

  return <Card>{content}</Card>
}
