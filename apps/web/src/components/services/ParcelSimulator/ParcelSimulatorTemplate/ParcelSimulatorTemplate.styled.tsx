import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Container = styled(m.div, {
  base: {
    position: "absolute",
    borderRadius: "{radii.lg}",
    bottom: "0",
    background: "{colors.elevated}",
    border: "2px solid {colors.elevated}",
    padding: "{spacing.s20}",
    opacity: "0.8",
    backdropFilter: "blur(10px)",
    top: "55%",
    left: "50%",
    width: "calc(100% - 100px)",
    height: "calc(100% - 100px)",
    transform: "translate(-50%, -50%)",
    "& > div": {
      height: "100%",
      "& > div:first-child": {
        display: "flex",
        justifyContent: "space-between",
        color: "{colors.foreground}",
      },
      "& p": {
        margin: "5px 0",
      },
      "& hr": {
        border: "none",
        height: "1px",
        margin: "{spacing.s20} 0",
        width: "100%",
        background: "{colors.elevated}",
      },
    },
  },
})

export const Backdrop = styled(m.div, {
  base: {
    position: "absolute",
    width: "100%",
    height: "calc(100% - 66px)",
    borderRadius: "{radii.lg}",
    bottom: "0",
    backdropFilter: "blur(2px)",
    zIndex: "-1",
  },
})

export const ErrorContainer = styled("div", {
  base: {
    color: "{colors.errorFg}",
    position: "absolute",
    width: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "{spacing.s20}",
  },
})

export const TemplateContainer = styled("div", {
  base: {
    color: "{colors.foreground}",
    margin: "10px 0",
    display: "flex",
    "& > div:first-child": {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      paddingRight: "10px",
      borderRight: "1px solid {colors.successFg}",
      "& > div": {
        width: "200px",
        textAlign: "center",
        padding: "10px 20px",
        borderRadius: "{radii.sm}",
        transition: "background 150ms",
        cursor: "pointer",
        '&[data-selected="true"]': {
          background: "{colors.elevated}",
        },
      },
    },
    "& > div:last-child": {
      margin: "0 10px",
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      "& span": {
        border: "2px solid {colors.elevated}",
        padding: "10px",
        borderRadius: "{radii.sm}",
      },
    },
  },
})

export const ActionContainer = styled("div", {
  base: {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    padding: "{spacing.s20}",
    bottom: "0",
    left: "0",
  },
})
