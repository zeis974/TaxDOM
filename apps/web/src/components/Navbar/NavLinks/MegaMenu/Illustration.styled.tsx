import { styled } from "@/panda/jsx"

// Text is set explicitly so `currentColor` stays the tool accent for bars, dots and swatches
export const Scene = styled("div", {
  base: {
    position: "absolute",
    left: "{spacing.lg}",
    right: "calc({spacing.lg} * -1)",
    bottom: "calc({spacing.lg} * -1)",
    height: "300px",
    perspective: "1000px",
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
  },
})

export const BackCard = styled("div", {
  base: {
    position: "absolute",
    top: "0",
    left: "calc({spacing.xl} * 2)",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
    width: "280px",
    height: "160px",
    padding: "{spacing.md}",
    border: "1px solid color-mix(in srgb, {colors.border} 30%, transparent)",
    borderRadius: "{radii.lg}",
    background: "{colors.background}",
    opacity: "0.6",
    transform: "rotateX(8deg) rotateY(-16deg) rotateZ(3deg)",
  },
})

export const Card = styled("div", {
  base: {
    position: "absolute",
    top: "{spacing.xl}",
    left: "0",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.s12}",
    width: "300px",
    padding: "{spacing.md}",
    border: "1px solid color-mix(in srgb, {colors.border} 30%, transparent)",
    borderRadius: "{radii.lg}",
    background: "{colors.background}",
    boxShadow: "0 24px 48px -16px {colors.shadow}",
    transform: "rotateX(8deg) rotateY(-16deg) rotateZ(3deg)",
    transformOrigin: "left bottom",
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
      width: "28px",
      height: "28px",
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
  },
})

export const Bar = styled("span", {
  base: {
    display: "block",
    flexShrink: "0",
    width: "calc({spacing.xl} * 2)",
    height: "{spacing.sm}",
    borderRadius: "{radii.full}",
    background: "{colors.textMuted}",
    opacity: "0.25",
    '&[data-tone="accent"]': {
      background: "currentColor",
      opacity: "0.85",
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
    '&[data-h="lg"]': {
      height: "{spacing.s12}",
    },
  },
})

export const Row = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "{spacing.md}",
  },
})

export const Field = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    padding: "{spacing.sm} {spacing.s12}",
    border: "1px solid color-mix(in srgb, {colors.border} 40%, transparent)",
    borderRadius: "{radii.md}",
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.label-md}",
    // Magnifier glyph
    "&::before": {
      content: '""',
      flexShrink: "0",
      width: "{spacing.s12}",
      height: "{spacing.s12}",
      border: "2px solid currentColor",
      borderRadius: "{radii.full}",
    },
  },
})

export const Divider = styled("hr", {
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

export const Column = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
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
    height: "calc({spacing.xl} + {spacing.md})",
  },
})

export const Pillar = styled("span", {
  base: {
    width: "{spacing.s12}",
    height: "{spacing.md}",
    borderRadius: "{radii.sm}",
    background: "{colors.textMuted}",
    opacity: "0.3",
    '&[data-tone="accent"]': {
      background: "currentColor",
      opacity: "0.85",
    },
    '&[data-h="md"]': {
      height: "{spacing.xl}",
    },
    '&[data-h="lg"]': {
      height: "calc({spacing.xl} + {spacing.md})",
    },
  },
})

export const Route = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
  },
})

export const Dot = styled("span", {
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

export const Line = styled("span", {
  base: {
    flex: "1",
    borderTop: "2px dashed currentColor",
    opacity: "0.5",
  },
})

export const Tiles = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "{spacing.s12} {spacing.sm}",
  },
})

export const Tile = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "{spacing.xs}",
    // Decorative swatch, no text sits on it
    "&::before": {
      content: '""',
      width: "100%",
      height: "{spacing.xl}",
      border: "1px solid color-mix(in srgb, currentColor 35%, transparent)",
      borderRadius: "{radii.md}",
      background: "color-mix(in srgb, currentColor 18%, {colors.background})",
    },
  },
})
