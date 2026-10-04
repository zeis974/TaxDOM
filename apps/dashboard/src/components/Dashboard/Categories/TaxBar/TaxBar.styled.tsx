import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
    width: "100%",
  },
})

export const TaxBarContainer = styled("div", {
  base: {
    display: "flex",
    height: "14px",
    borderRadius: "{radii.lg}",
    overflow: "hidden",
    position: "relative",
  },
})

export const TaxSegment = styled("div", {
  base: {
    height: "100%",
    position: "relative",
    cursor: "pointer",
    "&:first-child": {
      borderRadius: "10px 0 0 10px",
    },
    "&:last-child": {
      borderRadius: "0 10px 10px 0",
    },
    "&:only-child": {
      borderRadius: "{radii.lg}",
    },
    "&::after": {
      content: 'attr(data-percent) "%"',
      position: "absolute",
      top: "-22px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "0.7rem",
      fontWeight: "600",
      color: "{colors.background}",
      background: "{colors.foreground}",
      padding: "2px 6px",
      borderRadius: "{radii.sm}",
      boxShadow: "0 1px 3px {colors.shadow}",
      opacity: "0",
      pointerEvents: "none",
      whiteSpace: "nowrap",
    },
    "&:hover::after": {
      opacity: "1",
    },
  },
})

export const TaxLegend = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.md}",
    flexWrap: "wrap",
    fontSize: "0.75rem",
    color: "{colors.textMuted}",
  },
})

export const LegendItem = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: "500",
  },
})

export const LegendColor = styled("div", {
  base: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: "0",
  },
})

export const TotalTax = styled("span", {
  base: {
    marginLeft: "auto",
    fontWeight: "700",
    color: "{colors.foreground}",
    fontSize: "0.8rem",
    padding: "{spacing.xs} {spacing.sm}",
    background: "color-mix(in srgb, {colors.primary} 12%, transparent)",
    borderRadius: "{radii.lg}",
    border: "1px solid color-mix(in srgb, {colors.primary} 25%, transparent)",
  },
})
