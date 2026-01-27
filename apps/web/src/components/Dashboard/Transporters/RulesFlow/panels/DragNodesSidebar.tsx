"use client"

import type { DragEvent } from "react"
import type { ConditionType } from "@taxdom/types"
import {
  FlowSidebar,
  SidebarTitle,
  SidebarCard,
  SidebarIcon,
  SidebarText,
  SidebarCardTitle,
  SidebarCardDesc,
  SidebarHint,
} from "../RulesFlow.styled"

const draggableNodes = [
  {
    type: "condition",
    conditionType: "eu" as ConditionType,
    icon: "🇪🇺",
    label: "Origine UE",
    description: "Vérifie si l'origine est dans l'UE",
    color: "#3b82f6",
  },
  {
    type: "condition",
    conditionType: "individual" as ConditionType,
    icon: "👤",
    label: "Particulier",
    description: "Vérifie si c'est entre particuliers",
    color: "#3498db",
  },
  {
    type: "condition",
    conditionType: "amount" as ConditionType,
    icon: "💰",
    label: "Montant",
    description: "Vérifie le montant du colis",
    color: "#06b6d4",
  },
  {
    type: "fee",
    icon: "📦",
    label: "Frais",
    description: "Définit les frais à appliquer",
    color: "#f97316",
  },
]

export default function DragNodesSidebar() {
  const onDragStart = (event: DragEvent, nodeType: string, data: Record<string, unknown>) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType)
    event.dataTransfer.setData("application/reactflow/data", JSON.stringify(data))
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <FlowSidebar>
      <SidebarTitle>Glissez sur le canvas</SidebarTitle>

      {draggableNodes.map((node) => (
        <SidebarCard
          key={node.label}
          draggable
          onDragStart={(e) =>
            onDragStart(e, node.type, {
              conditionType: node.conditionType,
              ...(node.type === "fee" ? { fee: 0 } : {}),
              ...(node.conditionType === "amount" ? { operator: "lt", value: 100 } : {}),
            })
          }
        >
          <SidebarIcon>{node.icon}</SidebarIcon>
          <SidebarText>
            <SidebarCardTitle>{node.label}</SidebarCardTitle>
            <SidebarCardDesc>{node.description}</SidebarCardDesc>
          </SidebarText>
        </SidebarCard>
      ))}

      <SidebarHint>
        <strong>Astuce :</strong> connectez les nœuds via les poignées.
      </SidebarHint>
    </FlowSidebar>
  )
}
