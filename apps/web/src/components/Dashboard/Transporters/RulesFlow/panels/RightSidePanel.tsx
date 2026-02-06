"use client"

import { useState, useEffect, type DragEvent } from "react"
import type { Node } from "@xyflow/react"
import type { ConditionType } from "@taxdom/types"
import {
  RightPanel,
  RightPanelHeader,
  RightPanelTitle,
  CloseButton,
  TabsContainer,
  TabIndicator,
  Tab,
  NodesList,
  NodesSection,
  NodesSectionTitle,
  NodeCard,
  NodeIconWrapper,
  NodeInfo,
  NodeCardTitle,
  NodeCardDesc,
  TabContent,
} from "../RulesFlowEditor.styled"
import NodeEditor from "./NodeEditor"

type TabType = "nodes" | "inspector"

const ConditionIcons = {
  eu: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  individual: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  ),
  amount: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  fee: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
}

const conditionNodes = [
  {
    type: "condition",
    conditionType: "eu" as ConditionType,
    icon: ConditionIcons.eu,
    label: "Origine UE",
    description: "Vérifie si l'origine est dans l'UE",
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
  },
  {
    type: "condition",
    conditionType: "individual" as ConditionType,
    icon: ConditionIcons.individual,
    label: "Particulier",
    description: "Vérifie si c'est entre particuliers",
    color: "#3498db",
    bgColor: "rgba(52, 152, 219, 0.1)",
  },
  {
    type: "condition",
    conditionType: "amount" as ConditionType,
    icon: ConditionIcons.amount,
    label: "Montant",
    description: "Vérifie le montant du colis",
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.1)",
  },
]

const actionNodes = [
  {
    type: "fee",
    icon: ConditionIcons.fee,
    label: "Frais de livraison",
    description: "Définit les frais à appliquer",
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.1)",
  },
]

interface RightSidePanelProps {
  selectedNode: Node | null
  onUpdateNode: (nodeId: string, data: Record<string, unknown>) => void
  onDeleteNode: (nodeId: string) => void
  onCloseInspector: () => void
}

export default function RightSidePanel({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
  onCloseInspector,
}: RightSidePanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("nodes")

  // Switch to inspector when a node is selected
  useEffect(() => {
    if (selectedNode) {
      setActiveTab("inspector")
    }
  }, [selectedNode])

  const onDragStart = (event: DragEvent, nodeType: string, data: Record<string, unknown>) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType)
    event.dataTransfer.setData("application/reactflow/data", JSON.stringify(data))
    event.dataTransfer.effectAllowed = "move"
  }

  const handleCloseInspector = () => {
    onCloseInspector()
    setActiveTab("nodes")
  }

  return (
    <RightPanel>
      <RightPanelHeader>
        <RightPanelTitle>
          {activeTab === "inspector" ? "Inspector" : "Ajouter un nœud"}
        </RightPanelTitle>
        {activeTab === "inspector" && selectedNode && (
          <CloseButton onClick={handleCloseInspector} aria-label="Fermer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
        )}
      </RightPanelHeader>

      <TabsContainer>
        <TabIndicator data-active={activeTab} />
        <Tab data-active={activeTab === "nodes"} onClick={() => setActiveTab("nodes")}>
          Nœuds
        </Tab>
        <Tab data-active={activeTab === "inspector"} onClick={() => setActiveTab("inspector")}>
          Inspector
        </Tab>
      </TabsContainer>

      <TabContent style={{ display: activeTab === "nodes" ? "block" : "none" }}>
        <NodesList>
          <NodesSection>
            <NodesSectionTitle>Conditions</NodesSectionTitle>
            {conditionNodes.map((node) => (
              <NodeCard
                key={node.label}
                draggable
                onDragStart={(e) =>
                  onDragStart(e, node.type, {
                    conditionType: node.conditionType,
                    ...(node.conditionType === "amount" ? { operator: "lt", value: 100 } : {}),
                  })
                }
              >
                <NodeIconWrapper style={{ background: node.bgColor, color: node.color }}>
                  {node.icon}
                </NodeIconWrapper>
                <NodeInfo>
                  <NodeCardTitle>{node.label}</NodeCardTitle>
                  <NodeCardDesc>{node.description}</NodeCardDesc>
                </NodeInfo>
              </NodeCard>
            ))}
          </NodesSection>

          <NodesSection>
            <NodesSectionTitle>Actions</NodesSectionTitle>
            {actionNodes.map((node) => (
              <NodeCard
                key={node.label}
                draggable
                onDragStart={(e) =>
                  onDragStart(e, node.type, {
                    fee: 0,
                  })
                }
              >
                <NodeIconWrapper style={{ background: node.bgColor, color: node.color }}>
                  {node.icon}
                </NodeIconWrapper>
                <NodeInfo>
                  <NodeCardTitle>{node.label}</NodeCardTitle>
                  <NodeCardDesc>{node.description}</NodeCardDesc>
                </NodeInfo>
              </NodeCard>
            ))}
          </NodesSection>
        </NodesList>
      </TabContent>

      <TabContent style={{ display: activeTab === "inspector" ? "block" : "none" }}>
        <NodesList>
          {selectedNode ? (
            <NodeEditor
              node={selectedNode}
              onUpdate={onUpdateNode}
              onDelete={onDeleteNode}
              onClose={handleCloseInspector}
            />
          ) : (
            <NodesSection>
              <NodeCardDesc style={{ textAlign: "center", padding: "40px 16px" }}>
                Sélectionnez un nœud dans le canvas pour afficher ses paramètres.
              </NodeCardDesc>
            </NodesSection>
          )}
        </NodesList>
      </TabContent>
    </RightPanel>
  )
}
