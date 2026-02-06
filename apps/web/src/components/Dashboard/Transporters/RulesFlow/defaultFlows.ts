import type { Node, Edge } from "@xyflow/react"

/**
 * Flows par défaut pour les transporteurs connus
 * Ces flows sont utilisés quand aucune donnée n'existe en BDD
 */

export const defaultFlows: Record<string, { nodes: Node[]; edges: Edge[] }> = {
  // COLISSIMO: Frais fixe de 8€
  COLISSIMO: {
    nodes: [
      {
        id: "start",
        type: "start",
        position: { x: 250, y: 0 },
        data: { label: "Début" },
      },
      {
        id: "fee-colissimo",
        type: "fee",
        position: { x: 250, y: 150 },
        data: { label: "Frais Colissimo", fee: 8 },
      },
    ],
    edges: [
      {
        id: "edge-start-fee",
        source: "start",
        target: "fee-colissimo",
        sourceHandle: "default",
        animated: true,
      },
    ],
  },

  // CHRONOPOST: < 150€ = 8€, >= 150€ = 12€
  CHRONOPOST: {
    nodes: [
      {
        id: "start",
        type: "start",
        position: { x: 300, y: 0 },
        data: { label: "Début" },
      },
      {
        id: "condition-amount",
        type: "condition",
        position: { x: 300, y: 120 },
        data: {
          label: "Montant < 150€ ?",
          conditionType: "amount",
          operator: "lt",
          value: 150,
        },
      },
      {
        id: "fee-standard",
        type: "fee",
        position: { x: 120, y: 300 },
        data: { label: "Frais standard", fee: 8 },
      },
      {
        id: "fee-premium",
        type: "fee",
        position: { x: 480, y: 300 },
        data: { label: "Frais premium", fee: 12 },
      },
    ],
    edges: [
      {
        id: "edge-start-condition",
        source: "start",
        target: "condition-amount",
        sourceHandle: "default",
        animated: true,
      },
      {
        id: "edge-condition-yes",
        source: "condition-amount",
        target: "fee-standard",
        sourceHandle: "yes",
        label: "Oui",
        animated: true,
      },
      {
        id: "edge-condition-no",
        source: "condition-amount",
        target: "fee-premium",
        sourceHandle: "no",
        label: "Non",
        animated: true,
      },
    ],
  },

  // Flow par défaut vide
  DEFAULT: {
    nodes: [
      {
        id: "start",
        type: "start",
        position: { x: 250, y: 0 },
        data: { label: "Début" },
      },
    ],
    edges: [],
  },
}

/**
 * Récupère le flow par défaut pour un transporteur
 */
export function getDefaultFlow(transporterName: string): { nodes: Node[]; edges: Edge[] } {
  const upperName = transporterName.toUpperCase()
  return defaultFlows[upperName] || defaultFlows.DEFAULT
}
