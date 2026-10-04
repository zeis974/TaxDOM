import { styled } from "@/panda/jsx"

export const PanelContainer = styled("div", {
  base: {
    width: "320px",
    borderLeft: "1px solid {colors.border}",
    background: "{colors.background}",
    overflowY: "auto",
    padding: "{spacing.md}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const PanelHeader = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "{spacing.md}",
  },
})

export const PanelTitle = styled("h3", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    color: "{colors.foreground}",
  },
})

export const CloseButton = styled("button", {
  base: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "{colors.textMuted}",
    fontSize: "20px",
    padding: "{spacing.xs}",
    "&:hover": {
      color: "{colors.foreground}",
    },
  },
})

export const EmptyState = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    color: "{colors.textMuted}",
    textAlign: "center",
    gap: "{spacing.sm}",
  },
})

export const PaletteSection = styled("div", {
  base: {
    marginTop: "{spacing.lg}",
    paddingTop: "{spacing.md}",
    borderTop: "1px solid {colors.border}",
  },
})

export const PaletteTitle = styled("h4", {
  base: {
    margin: "0 0 {spacing.s12} 0",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    color: "{colors.textMuted}",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
})

export const PaletteItem = styled("div", {
  base: {
    padding: "10px 16px",
    background: "{colors.elevated}",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.md}",
    cursor: "grab",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    textAlign: "center",
    color: "{colors.foreground}",
    marginBottom: "{spacing.sm}",
    transition: "all 150ms",
    "&:hover": {
      borderColor: "{colors.foreground}",
      boxShadow: "0 2px 8px {colors.shadow}",
    },
  },
})
