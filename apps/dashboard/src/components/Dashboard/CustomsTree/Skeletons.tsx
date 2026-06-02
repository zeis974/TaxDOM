import { SkeletonRect } from "./CustomsTree.styled"

// ── Chapter list skeleton ─────────────────────────────────────────────────────

const CHAPTER_WIDTHS = [72, 88, 60, 78, 55, 82, 68, 90, 65, 74, 58, 85]

export function ChapterListSkeleton() {
  return (
    <>
      {CHAPTER_WIDTHS.map((w, i) => (
        <li key={i} aria-hidden="true" style={{ padding: "2px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 2px" }}>
            <SkeletonRect style={{ width: 22, height: 13, flexShrink: 0 }} />
            <SkeletonRect style={{ width: `${w}%`, height: 12 }} />
          </div>
        </li>
      ))}
    </>
  )
}

// ── Tree skeleton ─────────────────────────────────────────────────────────────

const TREE_NODES: Array<{ depth: number; codeW: number; descW: number }> = [
  { depth: 0, codeW: 38, descW: 52 },
  { depth: 0, codeW: 38, descW: 74 },
  { depth: 0, codeW: 38, descW: 44 },
  { depth: 1, codeW: 46, descW: 65 },
  { depth: 1, codeW: 46, descW: 55 },
  { depth: 2, codeW: 52, descW: 80 },
  { depth: 2, codeW: 52, descW: 60 },
  { depth: 2, codeW: 52, descW: 72 },
  { depth: 0, codeW: 38, descW: 58 },
  { depth: 0, codeW: 38, descW: 85 },
  { depth: 1, codeW: 46, descW: 48 },
  { depth: 0, codeW: 38, descW: 66 },
]

export function TreeSkeleton() {
  return (
    <div style={{ paddingTop: 4 }} aria-hidden="true">
      {TREE_NODES.map((node, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 8px",
          }}
        >
          {/* indent */}
          <span style={{ display: "block", width: node.depth * 20, flexShrink: 0 }} />
          {/* toggle button placeholder */}
          <SkeletonRect style={{ width: 16, height: 16, borderRadius: 3, flexShrink: 0 }} />
          {/* code badge */}
          <SkeletonRect style={{ width: node.codeW, height: 20, borderRadius: 4, flexShrink: 0 }} />
          {/* description */}
          <SkeletonRect style={{ width: `${node.descW}%`, height: 13, maxWidth: 420 }} />
        </div>
      ))}
    </div>
  )
}

// ── Header info skeleton ──────────────────────────────────────────────────────

export function HeaderSkeleton() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }} aria-hidden="true">
      {/* chapter number */}
      <SkeletonRect style={{ width: 36, height: 32, borderRadius: 6, flexShrink: 0 }} />
      {/* title + subtitle */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0, flex: 1 }}>
        <SkeletonRect style={{ width: "55%", height: 15, maxWidth: 280 }} />
        <SkeletonRect style={{ width: "35%", height: 12, maxWidth: 180 }} />
      </div>
    </div>
  )
}
