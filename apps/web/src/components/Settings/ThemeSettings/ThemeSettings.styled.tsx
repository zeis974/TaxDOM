import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    margin: "{spacing.s20} 0",
    color: "{colors.foreground}",
    "& > div:first-child": {
      flex: "1",
      paddingBottom: "10px",
      "& h3": {
        fontFamily: "{fonts.nativeFont}",
      },
      "& p": {
        fontFamily: "{fonts.nativeFont}",
        margin: "{spacing.s20} 0",
        color: "{colors.textMuted}",
      },
    },
  },
})

export const ThemeButton = styled("button", {
  base: {
    width: "100%",
    minWidth: "250px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "{radii.md}",
    outline: "none",
    border: "2px solid transparent",
    transition: "150ms border",
    marginBottom: "10px",
    '&:not([data-selected="true"]):hover': {
      border: "2px solid {colors.foreground}",
    },
    '&[data-selected="true"]': {
      border: "2px solid {colors.primary}",
    },
  },
})

export const ThemeContainer = styled("div", {
  base: {
    display: "flex",
    flex: "2",
    fontFamily: "{fonts.nativeFont}",
    "& > div": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "250px",
      height: "auto",
      margin: "0 10px",
    },
  },
})
