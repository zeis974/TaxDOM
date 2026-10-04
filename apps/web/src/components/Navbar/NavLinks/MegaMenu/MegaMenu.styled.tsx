import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

// Anchored to the `Nav` (position: relative), not to the trigger, so it spans the full width
export const Container = styled(m.div, {
  base: {
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    display: "grid",
    gridTemplateColumns: "1fr minmax(280px, 30%)",
    background: "{colors.background}",
    borderTop: "1px solid {colors.border}",
    borderRadius: "0 0 {radii.lg} {radii.lg}",
    boxShadow: "0 16px 32px {colors.shadow}",
    overflow: "hidden",
    cursor: "default",
    "& h2": {
      marginBottom: "{spacing.md}",
      fontFamily: "{fonts.nativeFont}",
      fontSize: "{fontSizes.body-sm}",
      fontWeight: "500",
      color: "{colors.textMuted}",
    },
    "& h3": {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.xs}",
      marginBottom: "{spacing.xs}",
      fontFamily: "{fonts.nativeFont}",
      fontSize: "{fontSizes.body-md}",
      fontWeight: "600",
    },
    "& p": {
      fontSize: "{fontSizes.body-sm}",
      lineHeight: "1.4",
      color: "{colors.textMuted}",
    },
    "& a:focus-visible": {
      outline: "2px solid {colors.primary}",
      outlineOffset: "-2px",
    },
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
})

export const Sections = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "{spacing.xl}",
    padding: "{spacing.xl}",
  },
})

export const Column = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
  },
})

export const Item = styled("div", {
  base: {
    "& > a": {
      display: "flex",
      alignItems: "flex-start",
      gap: "{spacing.md}",
      padding: "{spacing.s12}",
      borderRadius: "{radii.lg}",
      color: "{colors.foreground}",
      textDecoration: "none",
      transition: "background 150ms",
      "&:hover": {
        background: "{colors.elevated}",
      },
    },
    "& > a > span": {
      display: "flex",
      flexShrink: "0",
      "& svg": {
        width: "36px",
        height: "36px",
      },
    },
  },
})

export const Aside = styled("div", {
  base: {
    padding: "{spacing.xl}",
    background: "{colors.elevated}",
    "& > a": {
      display: "flex",
      flexDirection: "column",
      gap: "{spacing.sm}",
      padding: "{spacing.lg}",
      borderRadius: "{radii.lg}",
      background: "{colors.background}",
      color: "{colors.foreground}",
      textDecoration: "none",
      transition: "box-shadow 150ms",
      "&:hover": {
        boxShadow: "0 4px 16px {colors.shadow}",
      },
      "& > span": {
        marginTop: "{spacing.sm}",
        fontSize: "{fontSizes.body-sm}",
        fontWeight: "600",
        color: "{colors.primary}",
      },
    },
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
})
