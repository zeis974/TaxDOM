import { styled } from "@/panda/jsx"

export const SearchBar = styled("div", {
  base: {
    width: "400px",
    height: "50px",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    "@media (width < 1100px)": {
      display: "none",
    },
    "@media (width < 1200px)": {
      width: "300px",
    },
    "& > input": {
      width: "100%",
      height: "100%",
      zIndex: "2",
      color: "{colors.foreground}",
      background: "{colors.elevated}",
      borderRadius: "{radii.sm}",
      padding: "10px",
      border: "none",
      outline: "none",
    },
  },
})

export const SearchShortcut = styled("div", {
  base: {
    width: "68.5px",
    height: "40px",
    zIndex: "2",
    color: "{colors.background}",
    position: "absolute",
    fontFamily: "{fonts.rowdies}",
    right: "0",
    margin: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    background: "{colors.foreground}",
    borderRadius: "{radii.sm}",
    transition: "100ms",
    "& > svg, & > span": {
      animation: "fadeIn 600ms",
    },
    '&[data-focus="true"]': {
      width: "35px",
    },
  },
})
