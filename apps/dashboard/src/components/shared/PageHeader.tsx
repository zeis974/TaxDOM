import type { ReactNode } from "react"
import {
  PageContainer,
  PageHeaderActions,
  PageHeaderRow,
  PageHeaderTitle,
} from "./PageHeader.styled"

type PageHeaderProps = {
  title: string
  count?: number
  countLabel: string
  actions?: ReactNode
}

/**
 * Entête de page standard : titre + compteur d'éléments + actions.
 */
export function PageHeader({ title, count, countLabel, actions }: PageHeaderProps) {
  return (
    <PageHeaderRow>
      <PageHeaderTitle>
        <h2>{title}</h2>
        {count !== undefined && (
          <span>
            {count} {countLabel}
          </span>
        )}
      </PageHeaderTitle>
      {actions && <PageHeaderActions>{actions}</PageHeaderActions>}
    </PageHeaderRow>
  )
}

export { PageContainer }
