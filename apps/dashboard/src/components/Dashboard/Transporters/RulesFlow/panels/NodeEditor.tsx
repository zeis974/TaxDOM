import type { ConditionOperator, ConditionType } from "@taxdom/types"
import type { Node } from "@xyflow/react"
import { useState } from "react"
import Button from "@/components/ui/Button"
import {
  NodeEditorActions,
  NodeEditorField,
  NodeEditorPanel,
  NodeEditorTitle,
} from "../RulesFlow.styled"

interface NodeEditorProps {
  node: Node
  onUpdate: (nodeId: string, data: Record<string, unknown>) => boolean
  onDelete: (nodeId: string) => boolean
}

export function NodeEditor({ node, onUpdate, onDelete }: NodeEditorProps) {
  const data = node.data as Record<string, unknown>
  const [label, setLabel] = useState((data.label as string) || "")
  const [conditionType, setConditionType] = useState<ConditionType>(
    (data.conditionType as ConditionType) || "eu",
  )
  const [operator, setOperator] = useState<ConditionOperator>(
    (data.operator as ConditionOperator) || "lt",
  )
  const [value, setValue] = useState((data.value as number) ?? 0)
  const [fee, setFee] = useState((data.fee as number) ?? 0)

  const handleSave = () => {
    if (node.type === "condition") {
      onUpdate(node.id, { ...data, label, conditionType, operator, value })
    } else if (node.type === "fee") {
      onUpdate(node.id, { ...data, label, fee })
    }
  }

  return (
    <NodeEditorPanel>
      <NodeEditorTitle>
        {node.type === "start"
          ? "Nœud de départ"
          : node.type === "condition"
            ? "Condition"
            : "Frais"}
        <span style={{ fontSize: 11, color: "token(colors.darkGray)" }}>#{node.id}</span>
      </NodeEditorTitle>

      <NodeEditorField>
        <label>Label</label>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
      </NodeEditorField>

      {node.type === "condition" && (
        <>
          <NodeEditorField>
            <label>Type de condition</label>
            <select
              value={conditionType}
              onChange={(e) => setConditionType(e.target.value as ConditionType)}
            >
              <option value="eu">Origine UE</option>
              <option value="individual">Particulier</option>
              <option value="amount">Montant</option>
            </select>
          </NodeEditorField>
          {conditionType === "amount" && (
            <>
              <NodeEditorField>
                <label>Opérateur</label>
                <select
                  value={operator}
                  onChange={(e) => setOperator(e.target.value as ConditionOperator)}
                >
                  <option value="lt">&lt;</option>
                  <option value="lte">&le;</option>
                  <option value="gt">&gt;</option>
                  <option value="gte">&ge;</option>
                  <option value="eq">=</option>
                </select>
              </NodeEditorField>
              <NodeEditorField>
                <label>Valeur (€)</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                />
              </NodeEditorField>
            </>
          )}
        </>
      )}

      {node.type === "fee" && (
        <NodeEditorField>
          <label>Montant (€)</label>
          <input type="number" value={fee} onChange={(e) => setFee(Number(e.target.value))} />
        </NodeEditorField>
      )}

      <NodeEditorActions>
        {node.type !== "start" && (
          <Button
            type="button"
            onClick={() => onDelete(node.id)}
            style={{ background: "#fee2e2", color: "#991b1b" }}
          >
            Supprimer
          </Button>
        )}
        <Button type="button" onClick={handleSave}>
          Appliquer
        </Button>
      </NodeEditorActions>
    </NodeEditorPanel>
  )
}
