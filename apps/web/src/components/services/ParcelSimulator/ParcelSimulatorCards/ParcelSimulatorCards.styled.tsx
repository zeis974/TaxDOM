import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    height: "100%",
    gap: "{spacing.s20}",
    overflowY: "scroll",
    "& > button": {
      width: "calc(100% / 3 - 15px)",
      height: "220px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "{colors.foreground}",
      border: "2px solid transparent",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "15px",
      borderRadius: "{radii.lg}",
      transition: "border 150ms",
      "&[disabled]": {
        cursor: "default",
      },
      "&:hover:not([disabled])": {
        border: "2px solid {colors.foreground}",
      },
    },
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "{colors.background}",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "{colors.border}",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "{colors.textMuted}",
    },
  },
})

export const ParcelContent = styled("div", {
  base: {
    display: "flex",
    gap: "10px",
    width: "100%",
    background: "{colors.background}",
    paddingBottom: "5px",
    zIndex: "1",
    top: "0",
    "& > div:first-of-type": {
      position: "sticky",
      display: "inherit",
      justifyContent: "space-around",
      width: "100%",
      padding: "10px",
      borderRadius: "{radii.lg}",
      background: "{colors.elevated}",
    },
    "& button": {
      width: "100px",
      cursor: "pointer",
      padding: "10px",
      borderRadius: "{radii.lg}",
      border: "2px solid transparent",
      transition: "150ms",
      "&:hover": {
        background: "transparent",
        border: "2px solid {colors.elevated}",
      },
    },
  },
})

export const Card = styled("div", {
  base: {
    width: "calc(100% / 3 - 14px)",
    height: "220px",
    borderRadius: "{radii.lg}",
    padding: "10px",
    background: "{colors.elevated}",
    "& > button": {
      width: "100%",
      padding: "10px",
      borderRadius: "{radii.sm}",
      border: "2px solid transparent",
      marginTop: "5px",
      transition: "150ms",
      cursor: "pointer",
      "&:hover": {
        border: "2px solid {colors.errorFg}",
        background: "transparent",
      },
    },
  },
})

export const Loading = styled(m.div, {
  base: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "color-mix(in srgb, {colors.background} 54%, transparent)",
    backdropFilter: "blur(5px)",
    width: "100%",
    height: "100%",
    textAlign: "center",
    borderRadius: "{radii.lg}",
    zIndex: "2",
    "& > div": {
      position: "relative",
      display: "flex",
      width: "200px",
      height: "200px",
      alignItems: "center",
      justifyContent: "center",
      "&::after": {
        content: '""',
        position: "absolute",
        border: "5px solid {colors.primary}",
        borderTop: "5px solid transparent",
        borderRadius: "50%",
        width: "100%",
        height: "100%",
        animation: "rotate 1s linear infinite",
        opacity: "1",
        transition: "opacity 250ms",
      },
    },
    "& span": {
      fontSize: "2em",
      fontFamily: "{fonts.rowdies}",
      margin: "10px 0",
    },
  },
})

export const ParcelSimulatorSkeleton = styled("div", {
  base: {
    width: "100px",
    background: "{colors.elevated}",
    borderRadius: "{radii.lg}",
    animation: "skeleton 1s linear infinite",
  },
})
