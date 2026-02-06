"use client"

import type { Node, Edge } from "@xyflow/react"
import type { TransporterFlowNode, TransporterFlowEdge } from "@taxdom/types"
import RulesFlow from "./index"
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalCloseButton,
} from "./RulesFlow.styled"

interface RulesFlowModalProps {
  isOpen: boolean
  onClose: () => void
  transporterID: string
  transporterName: string
  initialNodes?: TransporterFlowNode[]
  initialEdges?: TransporterFlowEdge[]
  onSave?: (nodes: Node[], edges: Edge[]) => Promise<void>
}

export default function RulesFlowModal({
  isOpen,
  onClose,
  transporterID,
  transporterName,
  initialNodes = [],
  initialEdges = [],
  onSave,
}: RulesFlowModalProps) {
  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Configuration des règles de frais</ModalTitle>
          <ModalCloseButton type="button" onClick={onClose} aria-label="Fermer">
            ✕
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <RulesFlow
            transporterID={transporterID}
            transporterName={transporterName}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
            onSave={onSave}
          />
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}
