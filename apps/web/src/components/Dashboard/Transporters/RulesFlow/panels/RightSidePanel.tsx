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
  Tab,
  SearchContainer,
  SearchInput,
  NodesList,
  NodesSection,
  NodesSectionTitle,
  NodeCard,
  NodeIconWrapper,
  NodeInfo,
  NodeCardTitle,
  NodeCardDesc,
} from "../RulesFlowEditor.styled"
import NodeEditor from "./NodeEditor"

type TabType = "nodes" | "inspector"

const conditionNodes = [
  {
    type: "condition",
    conditionType: "eu" as ConditionType,
    icon: "🇪🇺",
    label: "Origine UE",
    description: "Vérifie si l'origine est dans l'UE",
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
  },
  {
    type: "condition",
    conditionType: "individual" as ConditionType,
    icon: "👤",
    label: "Particulier",
    description: "Vérifie si c'est entre particuliers",
    color: "#3498db",
    bgColor: "rgba(52, 152, 219, 0.1)",
  },
  {
    type: "condition",
    conditionType: "amount" as ConditionType,
    icon: "💰",
    label: "Montant",
    description: "Vérifie le montant du colis",
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.1)",
  },
]

const actionNodes = [
  {
    type: "fee",
    icon: "📦",
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
  const [searchQuery, setSearchQuery] = useState("")

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

  const filteredConditions = conditionNodes.filter(
    (node) =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredActions = actionNodes.filter(
    (node) =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
        <Tab data-active={activeTab === "nodes"} onClick={() => setActiveTab("nodes")}>
          Nœuds
        </Tab>
        <Tab data-active={activeTab === "inspector"} onClick={() => setActiveTab("inspector")}>
          Inspector
        </Tab>
      </TabsContainer>

      {activeTab === "nodes" ? (
        <>
          <SearchContainer>
            <SearchInput>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchInput>
          </SearchContainer>

          <NodesList>
            {filteredConditions.length > 0 && (
              <NodesSection>
                <NodesSectionTitle>Conditions</NodesSectionTitle>
                {filteredConditions.map((node) => (
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
                    <NodeIconWrapper style={{ background: node.bgColor }}>
                      {node.icon}
                    </NodeIconWrapper>
                    <NodeInfo>
                      <NodeCardTitle>{node.label}</NodeCardTitle>
                      <NodeCardDesc>{node.description}</NodeCardDesc>
                    </NodeInfo>
                  </NodeCard>
                ))}
              </NodesSection>
            )}

            {filteredActions.length > 0 && (
              <NodesSection>
                <NodesSectionTitle>Actions</NodesSectionTitle>
                {filteredActions.map((node) => (
                  <NodeCard
                    key={node.label}
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, node.type, {
                        fee: 0,
                      })
                    }
                  >
                    <NodeIconWrapper style={{ background: node.bgColor }}>
                      {node.icon}
                    </NodeIconWrapper>
                    <NodeInfo>
                      <NodeCardTitle>{node.label}</NodeCardTitle>
                      <NodeCardDesc>{node.description}</NodeCardDesc>
                    </NodeInfo>
                  </NodeCard>
                ))}
              </NodesSection>
            )}

            {filteredConditions.length === 0 && filteredActions.length === 0 && (
              <NodesSection>
                <NodeCardDesc style={{ textAlign: "center", padding: "20px 0" }}>
                  Aucun nœud trouvé pour &quot;{searchQuery}&quot;
                </NodeCardDesc>
              </NodesSection>
            )}
          </NodesList>
        </>
      ) : (
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
      )}
    </RightPanel>
  )
}
