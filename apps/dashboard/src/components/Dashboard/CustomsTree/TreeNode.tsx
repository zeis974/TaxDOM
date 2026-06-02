import type React from "react"
import { memo } from "react"
import {
  NodeCode,
  NodeDescription,
  NodeIndent,
  NodeProductBadge,
  NodeToggle,
  TreeNodeRow,
} from "./CustomsTree.styled"
import { formatHsCode } from "./format"

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <line
        x1="5"
        y1="1"
        x2="5"
        y2="9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="5"
        x2="9"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <line
        x1="1"
        y1="5"
        x2="9"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export type NomenclatureNode = {
  code: string
  description: string
  alinea: number
  type: number
  productCount: number
  children: NomenclatureNode[]
}

/** A single, already-flattened row ready for virtualised rendering. */
export type FlatRow = {
  node: NomenclatureNode
  depth: number
  hasChildren: boolean
  expanded: boolean
}

/**
 * Flattens the tree into the list of currently-visible rows: a node's children
 * are included only when that node's code is present in `expandedCodes`.
 * Top-level rows start at depth 1 (the root itself is never rendered).
 */
export function flattenTree(root: NomenclatureNode, expandedCodes: ReadonlySet<string>): FlatRow[] {
  const rows: FlatRow[] = []

  const walk = (node: NomenclatureNode, depth: number) => {
    const hasChildren = node.children.length > 0
    const expanded = expandedCodes.has(node.code)
    rows.push({ node, depth, hasChildren, expanded })
    if (hasChildren && expanded) {
      for (const child of node.children) walk(child, depth + 1)
    }
  }

  for (const child of root.children) walk(child, 1)
  return rows
}

interface TreeRowProps {
  node: NomenclatureNode
  depth: number
  hasChildren: boolean
  expanded: boolean
  isHighlighted: boolean
  onToggle: (code: string) => void
  onNodeClick: (node: NomenclatureNode) => void
}

function TreeRowComponent({
  node,
  depth,
  hasChildren,
  expanded,
  isHighlighted,
  onToggle,
  onNodeClick,
}: TreeRowProps) {
  const isClickable = node.productCount > 0

  return (
    <TreeNodeRow
      data-has-products={isClickable ? "true" : "false"}
      data-highlighted={isHighlighted ? "true" : "false"}
      onClick={() => {
        if (hasChildren) onToggle(node.code)
        if (isClickable) onNodeClick(node)
      }}
      style={{ cursor: hasChildren || isClickable ? "pointer" : "default" }}
      title={isClickable ? `${node.productCount} produit(s) — cliquer pour afficher` : undefined}
    >
      <NodeIndent style={{ "--indent-width": `${depth * 20}px` } as React.CSSProperties} />
      <NodeToggle
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          if (hasChildren) onToggle(node.code)
        }}
        aria-label={expanded ? "Réduire" : "Développer"}
        style={{ visibility: hasChildren ? "visible" : "hidden" }}
      >
        {expanded ? <MinusIcon /> : <PlusIcon />}
      </NodeToggle>
      <NodeCode>{formatHsCode(node.code)}</NodeCode>
      <NodeDescription>{node.description}</NodeDescription>
      {node.productCount > 0 && <NodeProductBadge>{node.productCount}</NodeProductBadge>}
    </TreeNodeRow>
  )
}

export const TreeRow = memo(TreeRowComponent)

/** Returns the set of codes on the path from root to the target (inclusive). */
export function buildAncestorSet(
  node: NomenclatureNode,
  target: string,
): ReadonlySet<string> | null {
  if (node.code === target) return new Set([node.code])
  for (const child of node.children) {
    const set = buildAncestorSet(child, target)
    if (set) return new Set([node.code, ...(set as Set<string>)])
  }
  return null
}
