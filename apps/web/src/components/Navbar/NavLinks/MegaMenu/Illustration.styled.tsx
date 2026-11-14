import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

// Text is set explicitly so `currentColor` stays the tool accent for bars, dots and swatches.
// Anchored to the bottom so the card never moves when the description wraps differently.
export const Scene = styled(m.div, {
  base: {
    position: "absolute",
    left: "{spacing.lg}",
    right: "0",
    bottom: "0",
    height: "calc({spacing.xl} * 10)",
    pointerEvents: "none",
    color: "{colors.primary}",
    '&[data-variant="orange"]': {
      color: "{colors.accentOrange}",
    },
    '&[data-variant="violet"]': {
      color: "{colors.accentViolet}",
    },
    '&[data-variant="green"]': {
      color: "{colors.accentGreen}",
    },
    '&[data-variant="cyan"]': {
      color: "{colors.accentCyan}",
    },
    '&[data-variant="pink"]': {
      color: "{colors.accentPink}",
    },
    // Accent glow behind the cards
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "calc({spacing.xl} * -2) 0 0 calc({spacing.xl} * -2)",
      background:
        "radial-gradient(closest-side, color-mix(in srgb, currentColor 22%, transparent), transparent)",
      "@media (prefers-reduced-motion: no-preference)": {
        animation: "pulse 4s ease-in-out infinite",
      },
    },
  },
})

// No text on the back card, only placeholder bars hinting at a second screen
export const BackCard = styled(m.div, {
  base: {
    position: "absolute",
    top: "0",
    left: "calc({spacing.xl} * 3)",
    right: "calc({spacing.xl} * -1)",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.s12}",
    height: "calc({spacing.xl} * 6)",
    padding: "{spacing.md}",
    border: "1px solid color-mix(in srgb, {colors.border} 30%, transparent)",
    borderRadius: "{radii.lg}",
    background: "color-mix(in srgb, {colors.background} 60%, {colors.elevated})",
  },
})

export const Card = styled(m.div, {
  base: {
    position: "absolute",
    top: "{spacing.xl}",
    left: "0",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.s12}",
    width: "calc({spacing.xl} * 10)",
    // Runs past the bottom edge so shorter bodies never leave an empty card foot
    height: "calc({spacing.xl} * 10)",
    padding: "{spacing.md}",
    overflow: "hidden",
    border: "1px solid color-mix(in srgb, {colors.border} 30%, transparent)",
    borderRadius: "{radii.lg}",
    background: "{colors.background}",
    boxShadow: "0 24px 48px -16px {colors.shadow}, 0 4px 12px -4px {colors.shadow}",
  },
})

export const Header = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    color: "{colors.foreground}",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "700",
    "& svg": {
      width: "{spacing.lg}",
      height: "{spacing.lg}",
    },
  },
})

export const Label = styled("span", {
  base: {
    color: "{colors.foreground}",
    fontSize: "{fontSizes.label-md}",
    whiteSpace: "nowrap",
    '&[data-weight="bold"]': {
      fontWeight: "700",
    },
    '&[data-tone="muted"]': {
      color: "{colors.textMuted}",
    },
  },
})

export const Bar = styled(m.span, {
  base: {
    display: "block",
    flexShrink: "0",
    width: "calc({spacing.xl} * 2)",
    height: "{spacing.sm}",
    borderRadius: "{radii.full}",
    transformOrigin: "left",
    background: "color-mix(in srgb, {colors.textMuted} 25%, transparent)",
    '&[data-tone="accent"]': {
      background: "currentColor",
    },
    // Light sweep across the result once it is computed
    "&[data-shine]": {
      backgroundImage:
        "linear-gradient(90deg, transparent 30%, color-mix(in srgb, {colors.background} 45%, transparent) 50%, transparent 70%)",
      backgroundSize: "200% 100%",
      "@media (prefers-reduced-motion: no-preference)": {
        animation: "skeleton-shimmer 2.4s linear infinite",
      },
    },
    '&[data-w="xs"]': {
      width: "{spacing.md}",
    },
    '&[data-w="sm"]': {
      width: "{spacing.xl}",
    },
    '&[data-w="md"]': {
      width: "calc({spacing.xl} + {spacing.md})",
    },
    '&[data-w="xl"]': {
      width: "calc({spacing.xl} * 3)",
    },
    '&[data-w="full"]': {
      flex: "1",
      width: "auto",
    },
    '&[data-h="lg"]': {
      height: "{spacing.s12}",
    },
  },
})

export const Row = styled(m.div, {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "{spacing.md}",
    minHeight: "{spacing.s20}",
  },
})

// Label column of fixed width so the bars line up like a chart
export const ChartRow = styled(m.div, {
  base: {
    display: "grid",
    gridTemplateColumns: "calc({spacing.xl} * 3) 1fr",
    alignItems: "center",
    gap: "{spacing.s12}",
    minHeight: "{spacing.s20}",
  },
})

export const Field = styled(m.div, {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    padding: "{spacing.sm} {spacing.s12}",
    border: "1px solid color-mix(in srgb, {colors.border} 40%, transparent)",
    borderRadius: "{radii.md}",
    color: "{colors.foreground}",
    fontSize: "{fontSizes.label-md}",
    // Magnifier glyph
    "&::before": {
      content: '""',
      flexShrink: "0",
      width: "{spacing.s12}",
      height: "{spacing.s12}",
      border: "2px solid {colors.textMuted}",
      borderRadius: "{radii.full}",
    },
  },
})

export const Caret = styled(m.span, {
  base: {
    width: "2px",
    height: "{spacing.md}",
    marginLeft: "calc({spacing.xs} * -1)",
    background: "currentColor",
  },
})

export const Chips = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.label-md}",
  },
})

export const Chip = styled(m.span, {
  base: {
    padding: "{spacing.xs} {spacing.sm}",
    borderRadius: "{radii.full}",
    background: "{colors.elevated}",
    color: "{colors.foreground}",
    fontSize: "{fontSizes.label-md}",
    fontWeight: "600",
    '&[data-tone="accent"]': {
      background: "color-mix(in srgb, currentColor 16%, {colors.background})",
    },
  },
})

export const Thumb = styled("span", {
  base: {
    flexShrink: "0",
    width: "{spacing.s20}",
    height: "{spacing.s20}",
    borderRadius: "{radii.sm}",
    background: "color-mix(in srgb, currentColor 18%, {colors.elevated})",
  },
})

export const Item = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
  },
})

export const Divider = styled(m.hr, {
  base: {
    border: "none",
    borderTop: "1px dashed color-mix(in srgb, {colors.border} 50%, transparent)",
  },
})

export const Columns = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "{spacing.s12}",
  },
})

export const Column = styled(m.div, {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.s12}",
    padding: "{spacing.s12}",
    borderRadius: "{radii.md}",
    background: "{colors.elevated}",
  },
})

export const Chart = styled("div", {
  base: {
    display: "flex",
    alignItems: "flex-end",
    gap: "{spacing.xs}",
    height: "calc({spacing.xl} * 3)",
    borderBottom: "1px solid color-mix(in srgb, {colors.border} 40%, transparent)",
  },
})

export const Pillar = styled(m.span, {
  base: {
    flex: "1",
    height: "{spacing.md}",
    borderRadius: "{radii.sm} {radii.sm} 0 0",
    transformOrigin: "bottom",
    background: "color-mix(in srgb, {colors.textMuted} 30%, transparent)",
    '&[data-tone="accent"]': {
      background: "currentColor",
    },
    '&[data-h="sm"]': {
      height: "{spacing.xl}",
    },
    '&[data-h="md"]': {
      height: "calc({spacing.xl} * 2)",
    },
    '&[data-h="lg"]': {
      height: "calc({spacing.xl} * 2 + {spacing.md})",
    },
  },
})

export const Route = styled(m.div, {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    minHeight: "{spacing.s20}",
  },
})

export const Dot = styled(m.span, {
  base: {
    flexShrink: "0",
    width: "{spacing.sm}",
    height: "{spacing.sm}",
    borderRadius: "{radii.full}",
    background: "currentColor",
    '&[data-tone="neutral"]': {
      background: "{colors.textMuted}",
    },
  },
})

export const Line = styled(m.span, {
  base: {
    position: "relative",
    flex: "1",
    transformOrigin: "left",
    borderTop: "2px dashed color-mix(in srgb, currentColor 50%, transparent)",
  },
})

// Parcel travelling along a route
export const Traveler = styled(m.span, {
  base: {
    position: "absolute",
    top: "calc({spacing.xs} * -1 - 1px)",
    width: "{spacing.sm}",
    height: "{spacing.sm}",
    marginLeft: "calc({spacing.xs} * -1)",
    borderRadius: "{radii.full}",
    background: "currentColor",
    boxShadow: "0 0 0 {spacing.xs} color-mix(in srgb, currentColor 25%, transparent)",
  },
})

export const Tiles = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "{spacing.sm}",
  },
})

export const Tile = styled(m.div, {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
    padding: "{spacing.sm}",
    border: "1px solid color-mix(in srgb, currentColor 30%, transparent)",
    borderRadius: "{radii.md}",
    background: "color-mix(in srgb, currentColor 10%, {colors.background})",
    // Decorative glyph
    "&::before": {
      content: '""',
      width: "{spacing.md}",
      height: "{spacing.md}",
      borderRadius: "{radii.sm}",
      background: "currentColor",
    },
  },
})
