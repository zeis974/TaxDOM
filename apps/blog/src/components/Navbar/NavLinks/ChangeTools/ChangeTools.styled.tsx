import { motion } from "motion/react"
import { styled } from "@/panda/jsx"

export const Container = styled(motion.div, {
  base: {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: "0",
    display: "flex",
    borderRadius: "{radii.lg}",
    border: "1px solid {colors.border}",
    background: "{colors.background}",
    boxShadow: "0 10px 30px {colors.shadow}",
    overflow: "hidden",
  },
})

export const Grid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "{spacing.sm}",
    width: "max-content",
    maxWidth: "720px",
    padding: "{spacing.lg}",
  },
})

export const Card = styled("div", {
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: "{spacing.md}",
    padding: "{spacing.md}",
    borderRadius: "{radii.lg}",
    border: "1px solid transparent",
    color: "{colors.foreground}",
    transition: "background 150ms, border-color 150ms",
    "&:hover": {
      background: "color-mix(in srgb, {colors.primary} 8%, {colors.elevated})",
      borderColor: "{colors.border}",
    },
    '&[aria-disabled="true"]': {
      opacity: "0.5",
      pointerEvents: "none",
    },
    "& > div:first-of-type": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      width: "44px",
      height: "44px",
      borderRadius: "{radii.md}",
      background: "{colors.elevated}",
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
    "& svg": {
      flexShrink: "0",
      color: "{colors.textMuted}",
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

export const SidePanel = styled("div", {
  base: {
    display: "flex",
    alignItems: "flex-end",
    flexShrink: "0",
    width: "240px",
    padding: "{spacing.lg}",
    background: "color-mix(in srgb, {colors.primary} 12%, {colors.elevated})",
    fontFamily: "{fonts.nativeFont}",
    fontSize: "{fontSizes.headline-md}",
    fontWeight: "600",
    color: "{colors.foreground}",
  },
})
