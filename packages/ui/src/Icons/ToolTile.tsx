import { type ReactNode, useId } from "react"

type ToolTileProps = {
  children: ReactNode
}

// Shared app-tile frame for the tool icons: accent fill with a darkening shade, top sheen and a
// white glyph slot. The fill is `currentColor`: the consumer sets it, dark enough in both modes
// to keep the white glyph at 3:1 or better.
export default function ToolTile({ children }: ToolTileProps) {
  const shadeId = useId()
  const sheenId = useId()
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <rect width="32" height="32" rx="8" fill={`url(#${shadeId})`} />
      <rect width="32" height="32" rx="8" fill={`url(#${sheenId})`} />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="white" strokeOpacity="0.16" />
      <g stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
      <defs>
        <linearGradient id={shadeId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="black" stopOpacity="0" />
          <stop offset="1" stopColor="black" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={sheenId} x1="16" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.18" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
