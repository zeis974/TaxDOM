/**
 * Composant ProcessHistory - À activer quand le système de logs sera prêt
 *
 * Ce composant affichera l'historique des modifications d'une origine.
 *
 * Aperçu visuel du rendu :
 * ┌─────────────────────────────────────────┐
 * │ ✅  Origine approuvée                   │
 * │     L'origine a été approuvée...        │
 * │     Jan 4 2025 • 23:59 • Victoria Krets │
 * ├─────────────────────────────────────────┤
 * │ ✏️  Origine mise à jour                 │
 * │     Le nom a été modifié...             │
 * │     Jan 3 2025 • 14:22 • Jean Dupont    │
 * ├─────────────────────────────────────────┤
 * │ ✨  Origine créée                       │
 * │     L'origine a été créée...            │
 * │     Jan 1 2025 • 10:15 • Système        │
 * └─────────────────────────────────────────┘
 *
 * Exemple d'utilisation future :
 *
 * <ProcessHistory logs={origin.logs} />
 *
 * Structure d'un log :
 * {
 *   id: string
 *   action: "created" | "updated" | "approved" | "rejected" | "deleted"
 *   description: string
 *   timestamp: string (ISO 8601)
 *   user?: string
 * }
 */

import {
  ProcessHistoryList,
  ProcessHistoryItem,
  ProcessHistoryIcon,
  ProcessHistoryContent,
  ProcessHistoryTitle,
  ProcessHistoryDescription,
  ProcessHistoryTimestamp,
} from "./OriginCard.styled"

type LogAction = "created" | "updated" | "approved" | "rejected" | "deleted"

interface Log {
  id: string
  action: LogAction
  description: string
  timestamp: string
  user?: string
}

interface ProcessHistoryProps {
  logs: Log[]
}

const getIconForAction = (action: LogAction): string => {
  switch (action) {
    case "created":
      return "✨"
    case "updated":
      return "✏️"
    case "approved":
      return "✅"
    case "rejected":
      return "❌"
    case "deleted":
      return "🗑️"
    default:
      return "📝"
  }
}

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default function ProcessHistory({ logs }: ProcessHistoryProps) {
  if (!logs || logs.length === 0) {
    return null
  }

  return (
    <ProcessHistoryList>
      {logs.map((log) => (
        <ProcessHistoryItem key={log.id}>
          <ProcessHistoryIcon>{getIconForAction(log.action)}</ProcessHistoryIcon>
          <ProcessHistoryContent>
            <ProcessHistoryTitle>
              {log.action === "created" && "Origine créée"}
              {log.action === "updated" && "Origine mise à jour"}
              {log.action === "approved" && "Origine approuvée"}
              {log.action === "rejected" && "Origine rejetée"}
              {log.action === "deleted" && "Origine supprimée"}
            </ProcessHistoryTitle>
            <ProcessHistoryDescription>{log.description}</ProcessHistoryDescription>
            <ProcessHistoryTimestamp dateTime={log.timestamp}>
              {formatTimestamp(log.timestamp)}
              {log.user && ` • ${log.user}`}
            </ProcessHistoryTimestamp>
          </ProcessHistoryContent>
        </ProcessHistoryItem>
      ))}
    </ProcessHistoryList>
  )
}

// Exemple de données de test à utiliser plus tard :
export const EXAMPLE_LOGS: Log[] = [
  {
    id: "1",
    action: "approved",
    description: "L'origine a été approuvée par la personne autorisée.",
    timestamp: "2025-01-04T23:59:42Z",
    user: "Victoria Krets",
  },
  {
    id: "2",
    action: "updated",
    description: "Le nom de l'origine a été modifié de 'FRANCE' à 'France Métropolitaine'.",
    timestamp: "2025-01-03T14:22:10Z",
    user: "Jean Dupont",
  },
  {
    id: "3",
    action: "created",
    description: "L'origine a été créée et sauvegardée dans le système.",
    timestamp: "2025-01-01T10:15:30Z",
    user: "Système",
  },
]
