import { styled } from "@/panda/jsx"

export const InputContainer = styled("div", {
  base: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    marginBottom: "10px",
    fontFamily: "{fonts.nativeFont}",
    "& > label": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
      fontSize: "clamp(0.875rem, 0.8529rem + 0.0941vw, 1rem)",
      fontWeight: "600",
      userSelect: "none",
      "& > span": {
        color: "{colors.errorFg}",
        fontSize: "0.8em",
      },
      "&:has(span)": {
        "& ~ input": {
          border: "2px solid {colors.errorFg}",
        },
      },
    },
    "& > input": {
      outline: "none",
      height: "35px",
      borderRadius: "5px",
      background: "{colors.background}",
      border: "2px solid transparent",
      padding: "5px",
      fontFamily: "inherit",
      transition: "border 150ms",
      "&:focus": {
        border: "2px solid {colors.primary}",
      },
      '&[disabled="true"], &[aria-disabled="true"]': {
        cursor: "not-allowed",
      },
    },
    '& > input[type="number"]': {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: "0",
      },
    },
  },
})
