"use client"

import type { ConditionOperator, ConditionType } from "@taxdom/types"
import type { Node } from "@xyflow/react"
import { useEffect, useId, useState } from "react"
import { toast } from "sonner"

import type { ConditionNodeData } from "../nodes/ConditionNode"
import type { FeeNodeData } from "../nodes/FeeNode"

import Button from "@/components/ui/Button"
import {
  NodeEditorActions,
  NodeEditorField,
  NodeEditorHelp,
  NodeEditorPanel,
  NodeEditorTitle,
} from "../RulesFlow.styled"

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

function safeParseNumber(value: string, fallback = 0): number {
  const parsed = Number(value)
  return Number.isNaN(parsed) ? fallback : parsed
}

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
  }, [node.id])

  const handleChange = (key: string, value: unknown) => {
    const newData = { ...localData, [key]: value }
    setLocalData(newData)
  }

  const handleSave = () => {
    if (node.type === "condition") {
      const data = localData as ConditionNodeData
      if (data.conditionType === "amount") {
        if (!data.operator) {
          toast.error("Veuillez sélectionner un opérateur")
          return
        }
        if (data.value === undefined || data.value === null || Number.isNaN(data.value)) {
          toast.error("Veuillez entrer une valeur numérique valide")
          return
        }
        if (data.value < 0 || data.value > 1_000_000) {
          toast.error("La valeur doit être comprise entre 0 et 1 000 000")
          return
        }
      }
    }

    if (node.type === "fee") {
      const data = localData as FeeNodeData
      if (data.fee === undefined || data.fee === null || Number.isNaN(data.fee)) {
        toast.error("Veuillez entrer un montant de frais valide")
        return
      }
      if (data.fee < 0 || data.fee > 10_000) {
        toast.error("Les frais doivent être compris entre 0 et 10 000")
        return
      }
    }

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
                onChange={(e) => handleChange("value", safeParseNumber(e.target.value))}
                min={0}
                max={1_000_000}
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
            onChange={(e) => handleChange("fee", safeParseNumber(e.target.value))}
            min={0}
            max={10_000}
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
        return "Nœud de départ"
      case "condition":
        return "Condition"
      case "fee":
        return "Frais"
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
