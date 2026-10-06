import { styled } from "@/panda/jsx"
import * as m from "motion/react-m"

export const Container = styled(m.div, {
  base: {
    position: "absolute",
    borderRadius: "{radii.lg}",
    top: "calc(100% + 10px)",
    right: "-150px",
    width: "500px",
    height: "100%",
    background: "{colors.background}",
    "&::before": {
      content: '""',
      position: "fixed",
      bottom: "100%",
      width: "160px",
      height: "100px",
    },
    "& a:first-child > div": {
      borderRadius: "{radii.lg} {radii.lg} 0 0",
    },
    "& a:last-child > div": {
      borderRadius: "0 0 {radii.lg} {radii.lg}",
    },
  },
})

export const CardContainer = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    color: "{colors.foreground}",
    background: "{colors.background}",
    width: "100%",
    height: "100px",
    padding: "{spacing.s20}",
    gap: "{spacing.s20}",
    borderTop: "1px solid {colors.border}",
    borderRight: "1px solid {colors.border}",
    borderLeft: "1px solid {colors.border}",
    transition: "background 150ms",
    "&:hover": {
      background: "{colors.elevated}",
    },
    "& > div:last-of-type": {
      height: "40px",
      lineHeight: "1",
      "& h3": {
        marginBottom: "3px",
      },
      "& p": {
        lineHeight: "1",
        color: "{colors.textMuted}",
      },
    },
  },
})
