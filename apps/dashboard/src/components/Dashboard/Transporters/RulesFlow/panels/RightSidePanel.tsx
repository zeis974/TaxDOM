import type { Node } from "@xyflow/react"
import { NodeEditor } from "./NodeEditor"
import {
  CloseButton,
  EmptyState,
  PaletteItem,
  PaletteSection,
  PaletteTitle,
  PanelContainer,
  PanelHeader,
  PanelTitle,
} from "./RightSidePanel.styled"

interface RightSidePanelProps {
  selectedNode: Node | null
  onUpdateNode: (nodeId: string, data: Record<string, unknown>) => boolean
  onDeleteNode: (nodeId: string) => boolean
  onCloseInspector: () => void
}

export default function RightSidePanel({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
  onCloseInspector,
}: RightSidePanelProps) {
  return (
    <PanelContainer>
      {selectedNode ? (
        <>
          <PanelHeader>
            <PanelTitle>Inspecteur de nœud</PanelTitle>
            <CloseButton onClick={onCloseInspector}>&times;</CloseButton>
          </PanelHeader>
          <NodeEditor node={selectedNode} onUpdate={onUpdateNode} onDelete={onDeleteNode} />
        </>
      ) : (
        <>
          <PanelHeader>
            <PanelTitle>Palette de nœuds</PanelTitle>
          </PanelHeader>
          <EmptyState>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>Sélectionnez un nœud pour l'éditer</span>
          </EmptyState>
          <PaletteSection>
            <PaletteTitle>Ajouter des nœuds</PaletteTitle>
            <PaletteItem
              onDragStart={(e) => {
                e.dataTransfer.setData("application/reactflow/type", "condition")
                e.dataTransfer.effectAllowed = "move"
              }}
              draggable
            >
              Condition
            </PaletteItem>
            <PaletteItem
              onDragStart={(e) => {
                e.dataTransfer.setData("application/reactflow/type", "fee")
                e.dataTransfer.effectAllowed = "move"
              }}
              draggable
            >
              Frais
            </PaletteItem>
          </PaletteSection>
        </>
      )}
    </PanelContainer>
  )
}
