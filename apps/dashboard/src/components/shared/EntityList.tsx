import type { ReactNode } from "react"
import { EmptyAction, EmptyState, ListContainer, ListGrid } from "./List.styled"

type EntityListProps<T> = {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
  emptyIcon: ReactNode
  emptyTitle: string
  emptyDescription: string
  /** Action primaire affichée dans l'état vide (ex. bouton « Ajouter »). */
  emptyAction?: ReactNode
}

/**
 * Grille d'entités générique avec état vide homogène.
 */
export function EntityList<T>({
  items,
  getKey,
  renderItem,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  emptyAction,
}: EntityListProps<T>) {
  if (items.length === 0) {
    return (
      <ListContainer>
        <EmptyState>
          {emptyIcon}
          <h3>{emptyTitle}</h3>
          <p>{emptyDescription}</p>
          {emptyAction ? <EmptyAction>{emptyAction}</EmptyAction> : null}
        </EmptyState>
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      <ListGrid>
        {items.map((item) => (
          <div key={getKey(item)}>{renderItem(item)}</div>
        ))}
      </ListGrid>
    </ListContainer>
  )
}
