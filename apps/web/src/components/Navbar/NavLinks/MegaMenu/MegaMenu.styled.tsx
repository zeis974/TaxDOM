import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Panel = styled(m.div, {
  base: {
    position: "fixed",
    top: "{sizes.navbarHeight}",
    left: "0",
    right: "0",
    zIndex: "3",
    background: "{colors.background}",
    borderBottom: "1px solid {colors.border}",
    boxShadow: "0 12px 32px {colors.shadow}",
  },
})

export const Body = styled("div", {
  base: {
    display: "flex",
    gap: "{spacing.lg}",
    padding: "{spacing.lg} {spacing.xl}",
    "@media (width < 1024px)": {
      flexDirection: "column",
    },
  },
})

export const Grid = styled("div", {
  base: {
    flex: "1",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "{spacing.sm}",
    alignContent: "start",
    "& > a": {
      borderRadius: "{radii.lg}",
      "&:focus-visible": {
        outline: "2px solid {colors.primary}",
        outlineOffset: "2px",
      },
    },
    "@media (width < 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
})

export const Card = styled("div", {
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: "{spacing.md}",
    height: "100%",
    padding: "{spacing.md}",
    border: "1px solid transparent",
    borderRadius: "{radii.lg}",
    color: "{colors.foreground}",
    transition: "background 150ms, border-color 150ms",
    '&[data-active="true"]': {
      background: "color-mix(in srgb, {colors.primary} 8%, {colors.elevated})",
      borderColor: "{colors.border}",
    },
    '&[aria-disabled="true"]': {
      opacity: "0.45",
      pointerEvents: "none",
    },
  },
})

export const CardIcon = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    width: "48px",
    height: "48px",
    borderRadius: "{radii.lg}",
    background: "{colors.elevated}",
    "& svg": {
      width: "30px",
      height: "30px",
    },
  },
})

export const CardTitle = styled("h3", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "{spacing.sm}",
    fontSize: "{fontSizes.body-md}",
    fontWeight: "600",
  },
})

export const CardTitleIcon = styled("span", {
  base: {
    display: "grid",
    flexShrink: "0",
    color: "{colors.textMuted}",
    opacity: "0",
    rotate: "-90deg",
    transition: "opacity 150ms, rotate 150ms",
    '&[data-active="true"]': {
      opacity: "1",
      rotate: "0deg",
    },
  },
})

export const CardDescription = styled("p", {
  base: {
    marginTop: "{spacing.xs}",
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.body-sm}",
  },
})

export const PromoPanel = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    flexShrink: "0",
    width: "300px",
    minHeight: "240px",
    padding: "{spacing.lg}",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.lg}",
    background: "color-mix(in srgb, {colors.primary} 12%, {colors.elevated})",
    color: "{colors.foreground}",
    overflow: "hidden",
    "@media (width < 1024px)": {
      display: "none",
    },
  },
})

export const PromoContent = styled(m.div, {
  base: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    "& > div svg": {
      width: "96px",
      height: "96px",
    },
  },
})

export const PromoName = styled("p", {
  base: {
    maxWidth: "14ch",
    fontSize: "{fontSizes.headline-lg}",
    fontWeight: "600",
  },
})
