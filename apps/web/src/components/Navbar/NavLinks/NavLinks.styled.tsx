import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    display: "flex",
    alignItems: "stretch",
    alignSelf: "stretch",
    marginLeft: "{spacing.lg}",
    gap: "{spacing.lg}",
    fontFamily: "{fonts.nativeFont}",
    // Not positioned so the mega menu anchors to the Nav; z-index still applies to flex items and keeps the menu above the Backdrop
    "& > div:first-of-type": {
      zIndex: "3",
      display: "flex",
      alignItems: "center",
      alignSelf: "stretch",
      borderBottom: "2px solid transparent",
      transition: "border-color 150ms",
    },
    '& > div[data-active="true"]': {
      borderBottomColor: "{colors.primary}",
    },
    "& > a, & > div:first-of-type > button": {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.xs}",
      padding: "{spacing.sm} {spacing.md}",
      transition: "background 150ms, color 150ms",
      color: "{colors.foreground}",
      background: "none",
      border: "none",
      font: "inherit",
      fontSize: "{fontSizes.body-md}",
      cursor: "pointer",
      borderRadius: "{radii.sm}",
      "&:hover": {
        background: "{colors.elevated}",
      },
      "&:focus-visible": {
        outline: "2px solid {colors.primary}",
        outlineOffset: "2px",
      },
    },
    "& > a": {
      alignSelf: "center",
      textDecoration: "none",
    },
    "& svg": {
      transition: "transform 150ms",
    },
    '& [data-active="true"] > button': {
      color: "{colors.primary}",
    },
    '& [data-active="true"] > button > svg': {
      transform: "rotate(180deg)",
    },
  },
})

export const Backdrop = styled(m.div, {
  base: {
    position: "fixed",
    inset: "{sizes.navbarHeight} 0 0",
    background: "{colors.overlay}",
    zIndex: "2",
  },
})
