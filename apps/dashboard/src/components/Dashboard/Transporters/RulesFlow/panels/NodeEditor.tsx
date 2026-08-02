import type { ConditionOperator, ConditionType } from "@taxdom/types"
import type { Node } from "@xyflow/react"
import { useState } from "react"
import Button from "@/components/ui/Button"
import {
  DeleteNodeButton,
  NodeEditorActions,
  NodeEditorField,
  NodeEditorId,
  NodeEditorPanel,
  NodeEditorTitle,
} from "../RulesFlow.styled"

// Mirror the bounds the API validator enforces, so a value can't be typed here
// only to be rejected at save time.
const MAX_LABEL_LENGTH = 100
const MAX_AMOUNT = 1_000_000
const MAX_FEE = 10_000

interface NodeEditorProps {
  node: Node
  onUpdate: (nodeId: string, data: Record<string, unknown>) => boolean
  onDelete: (nodeId: string) => boolean
}

const toNumber = (raw: string, max: number) => {
  const parsed = Number(raw)
  if (Number.isNaN(parsed)) return 0
  return Math.min(Math.max(parsed, 0), max)
}

const nodeTitles: Record<string, string> = {
  start: "Nœud de départ",
  condition: "Condition",
  fee: "Frais",
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
    } else {
      onUpdate(node.id, { ...data, label })
    }
  }

  return (
    <NodeEditorPanel>
      <NodeEditorTitle>
        {nodeTitles[node.type ?? "start"]}
        <NodeEditorId title={node.id}>#{node.id}</NodeEditorId>
      </NodeEditorTitle>

      <NodeEditorField>
        <label htmlFor={`node-label-${node.id}`}>Label</label>
        <input
          id={`node-label-${node.id}`}
          type="text"
          value={label}
          maxLength={MAX_LABEL_LENGTH}
          onChange={(e) => setLabel(e.target.value)}
        />
      </NodeEditorField>

      {node.type === "condition" && (
        <>
          <NodeEditorField>
            <label htmlFor={`node-type-${node.id}`}>Type de condition</label>
            <select
              id={`node-type-${node.id}`}
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
                <label htmlFor={`node-operator-${node.id}`}>Opérateur</label>
                <select
                  id={`node-operator-${node.id}`}
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
                <label htmlFor={`node-value-${node.id}`}>Valeur (€)</label>
                <input
                  id={`node-value-${node.id}`}
                  type="number"
                  min={0}
                  max={MAX_AMOUNT}
                  step={0.01}
                  value={value}
                  onChange={(e) => setValue(toNumber(e.target.value, MAX_AMOUNT))}
                />
              </NodeEditorField>
            </>
          )}
        </>
      )}

      {node.type === "fee" && (
        <NodeEditorField>
          <label htmlFor={`node-fee-${node.id}`}>Montant (€)</label>
          <input
            id={`node-fee-${node.id}`}
            type="number"
            min={0}
            max={MAX_FEE}
            step={0.01}
            value={fee}
            onChange={(e) => setFee(toNumber(e.target.value, MAX_FEE))}
          />
        </NodeEditorField>
      )}

      <NodeEditorActions>
        {node.type !== "start" && (
          <DeleteNodeButton type="button" onClick={() => onDelete(node.id)}>
            Supprimer
          </DeleteNodeButton>
        )}
        <Button type="button" onClick={handleSave}>
          Appliquer
        </Button>
      </NodeEditorActions>
    </NodeEditorPanel>
  )
}
