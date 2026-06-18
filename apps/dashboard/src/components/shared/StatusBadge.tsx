import type { ReactNode } from "react"
import { StatusBadgeStyled } from "./Card.styled"

type StatusBadgeProps = {
  active: boolean
  children: ReactNode
}

/**
 * Badge de statut actif/inactif. Encodage unique pour tout le dashboard.
 */
export function StatusBadge({ active, children }: StatusBadgeProps) {
  return <StatusBadgeStyled data-active={active}>{children}</StatusBadgeStyled>
}
