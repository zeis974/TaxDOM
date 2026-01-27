"use client"

import type { ConditionType, ConditionOperator } from "@taxdom/types"
import {
  AddNodePanel as AddNodePanelStyled,
  AddNodeTitle,
  AddNodeButton,
} from "../RulesFlow.styled"

interface AddNodePanelComponentProps {
  onAddNode: (type: "condition" | "fee", data?: Record<string, unknown>) => void
  onClose: () => void
}

const nodeOptions = [
  {
    type: "condition" as const,
    conditionType: "eu" as ConditionType,
    icon: "🇪🇺",
    label: "Origine UE",
    description: "Vérifie si l'origine est dans l'UE",
    color: "#3b82f6",
  },
  {
    type: "condition" as const,
    conditionType: "individual" as ConditionType,
    icon: "👤",
    label: "Particulier",
    description: "Vérifie si c'est entre particuliers",
    color: "#3498db",
  },
  {
    type: "condition" as const,
    conditionType: "amount" as ConditionType,
    icon: "💰",
    label: "Montant",
    description: "Vérifie le montant du colis",
    color: "#06b6d4",
  },
  {
    type: "fee" as const,
    icon: "📦",
    label: "Frais",
    description: "Définit les frais à appliquer",
    color: "#f97316",
  },
]

export default function AddNodePanelComponent({ onAddNode, onClose }: AddNodePanelComponentProps) {
  const handleAddCondition = (conditionType: ConditionType) => {
    const defaultData: Record<string, unknown> = { conditionType }
    if (conditionType === "amount") {
      defaultData.operator = "lt" as ConditionOperator
      defaultData.value = 100
    }
    onAddNode("condition", defaultData)
    onClose()
  }

  const handleAddFee = () => {
    onAddNode("fee", { fee: 0 })
    onClose()
  }

  return (
    <AddNodePanelStyled>
      <AddNodeTitle>
        <span>Ajouter un nœud</span>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            color: "#9ca3af",
          }}
        >
          ✕
        </button>
      </AddNodeTitle>

      {nodeOptions.map((option) => (
        <AddNodeButton
          key={option.label}
          type="button"
          onClick={() => {
            if (option.type === "fee") {
              handleAddFee()
            } else {
              handleAddCondition(option.conditionType!)
            }
          }}
          style={{ borderLeftColor: option.color, borderLeftWidth: "3px" }}
        >
          <span style={{ fontSize: "20px" }}>{option.icon}</span>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{option.label}</div>
            <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
              {option.description}
            </div>
          </div>
        </AddNodeButton>
      ))}
    </AddNodePanelStyled>
  )
}
