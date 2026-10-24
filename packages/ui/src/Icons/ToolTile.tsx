import { type ReactNode, useId } from "react"

type ToolTileProps = {
  from: string
  to: string
  children: ReactNode
}

// Shared app-tile frame for the tool icons: gradient fill, top sheen and a white glyph slot.
// Both stops keep white strokes at 3:1 or better, so the tile reads the same in both modes.
export default function ToolTile({ from, to, children }: ToolTileProps) {
  const fillId = useId()
  const sheenId = useId()
  return (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill={`url(#${fillId})`} />
      <rect width="32" height="32" rx="8" fill={`url(#${sheenId})`} />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="white" strokeOpacity="0.16" />
      <g stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <linearGradient id={sheenId} x1="16" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.18" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
