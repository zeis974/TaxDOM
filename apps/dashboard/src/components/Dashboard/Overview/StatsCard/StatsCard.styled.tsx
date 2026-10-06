import { Link } from "@tanstack/react-router"
import { styled } from "@/panda/jsx"

export const Card = styled("div", {
  base: {
    background: "{colors.elevated}",
    border: "none",
    borderRadius: "{radii.md}",
    padding: "{spacing.s20}",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
  },
})

export const CardLink = styled(Link, {
  base: {
    background: "{colors.elevated}",
    border: "none",
    borderRadius: "{radii.md}",
    padding: "{spacing.md}",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 150ms ease",
    "&:hover": {
      boxShadow: "0 8px 20px {colors.shadow}",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.primary}",
      outlineOffset: "2px",
    },
  },
})

export const CardContent = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
  },
})

export const CardTitle = styled("h3", {
  base: {
    fontSize: "0.875em",
    color: "{colors.textMuted}",
    margin: "0",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
})

export const CardValue = styled("p", {
  base: {
    fontSize: "1.6em",
    fontWeight: "bold",
    color: "{colors.foreground}",
    margin: "0",
    fontFamily: "{fonts.nativeFont}",
  },
})
