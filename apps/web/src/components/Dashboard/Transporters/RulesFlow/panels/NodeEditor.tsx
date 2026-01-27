"use client"

import { useState, useEffect, useId } from "react"
import type { Node } from "@xyflow/react"
import type { ConditionType, ConditionOperator } from "@taxdom/types"
import Button from "@/components/ui/Button"
import {
  NodeEditorPanel,
  NodeEditorTitle,
  NodeEditorField,
  NodeEditorActions,
  NodeEditorHelp,
} from "../RulesFlow.styled"
import type { ConditionNodeData } from "../nodes/ConditionNode"
import type { FeeNodeData } from "../nodes/FeeNode"

interface NodeEditorProps {
  node: Node
  onUpdate: (nodeId: string, data: Record<string, unknown>) => void
  onDelete: (nodeId: string) => void
  onClose: () => void
}

const conditionTypeOptions: { value: ConditionType; label: string }[] = [
  { value: "eu", label: "Origine UE ?" },
  { value: "individual", label: "Entre particuliers ?" },
  { value: "amount", label: "Montant" },
]

const operatorOptions: { value: ConditionOperator; label: string }[] = [
  { value: "lt", label: "< (inférieur)" },
  { value: "lte", label: "≤ (inférieur ou égal)" },
  { value: "gt", label: "> (supérieur)" },
  { value: "gte", label: "≥ (supérieur ou égal)" },
  { value: "eq", label: "= (égal)" },
]

export default function NodeEditor({ node, onUpdate, onDelete, onClose }: NodeEditorProps) {
  const [localData, setLocalData] = useState<Record<string, unknown>>(
    node.data as Record<string, unknown>,
  )
  const conditionTypeId = useId()
  const operatorId = useId()
  const valueId = useId()
  const labelId = useId()
  const feeId = useId()
  const feeLabelId = useId()

  useEffect(() => {
    setLocalData(node.data as Record<string, unknown>)
  }, [node])

  const handleChange = (key: string, value: unknown) => {
    const newData = { ...localData, [key]: value }
    setLocalData(newData)
  }

  const handleSave = () => {
    onUpdate(node.id, localData)
    onClose()
  }

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce nœud ?")) {
      onDelete(node.id)
      onClose()
    }
  }

  const renderConditionFields = () => {
    const data = localData as ConditionNodeData
    return (
      <>
        <NodeEditorField>
          <label htmlFor={conditionTypeId}>Type de condition</label>
          <select
            id={conditionTypeId}
            value={data.conditionType || "eu"}
            onChange={(e) => handleChange("conditionType", e.target.value)}
          >
            {conditionTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </NodeEditorField>

        {data.conditionType === "amount" && (
          <>
            <NodeEditorField>
              <label htmlFor={operatorId}>Opérateur</label>
              <select
                id={operatorId}
                value={data.operator || "lt"}
                onChange={(e) => handleChange("operator", e.target.value)}
              >
                {operatorOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </NodeEditorField>

            <NodeEditorField>
              <label htmlFor={valueId}>Valeur (€)</label>
              <input
                id={valueId}
                type="number"
                value={(data.value as number) || 0}
                onChange={(e) => handleChange("value", Number(e.target.value))}
                min={0}
              />
            </NodeEditorField>
          </>
        )}

        <NodeEditorField>
          <label htmlFor={labelId}>Label personnalisé (optionnel)</label>
          <input
            id={labelId}
            type="text"
            value={(data.label as string) || ""}
            onChange={(e) => handleChange("label", e.target.value)}
            placeholder="Label automatique si vide"
          />
        </NodeEditorField>
      </>
    )
  }

  const renderFeeFields = () => {
    const data = localData as FeeNodeData
    return (
      <>
        <NodeEditorField>
          <label htmlFor={feeId}>Montant des frais (€)</label>
          <input
            id={feeId}
            type="number"
            value={data.fee || 0}
            onChange={(e) => handleChange("fee", Number(e.target.value))}
            min={0}
            step={0.01}
          />
        </NodeEditorField>

        <NodeEditorField>
          <label htmlFor={feeLabelId}>Label personnalisé (optionnel)</label>
          <input
            id={feeLabelId}
            type="text"
            value={(data.label as string) || ""}
            onChange={(e) => handleChange("label", e.target.value)}
            placeholder="Frais"
          />
        </NodeEditorField>
      </>
    )
  }

  const getNodeTypeLabel = () => {
    switch (node.type) {
      case "start":
        return "🟢 Nœud de départ"
      case "condition":
        return "🔵 Condition"
      case "fee":
        return "🟠 Frais"
      default:
        return "Nœud"
    }
  }

  return (
    <NodeEditorPanel>
      <NodeEditorTitle>
        {getNodeTypeLabel()}
        <Button type="button" variant="secondary" onClick={onClose}>
          Fermer
        </Button>
      </NodeEditorTitle>

      {node.type === "start" && (
        <NodeEditorHelp>Le nœud de départ ne peut pas être modifié.</NodeEditorHelp>
      )}

      {node.type === "condition" && renderConditionFields()}
      {node.type === "fee" && renderFeeFields()}

      <NodeEditorActions>
        {node.type !== "start" && (
          <>
            <Button type="button" variant="primary" onClick={handleSave}>
              Sauvegarder
            </Button>
            <Button type="button" variant="danger" onClick={handleDelete}>
              Supprimer
            </Button>
          </>
        )}
      </NodeEditorActions>
    </NodeEditorPanel>
  )
}
