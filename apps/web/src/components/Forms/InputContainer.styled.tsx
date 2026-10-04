import { styled } from "@/panda/jsx"

export const InputContainer = styled("div", {
  base: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    marginBottom: "0",
    fontFamily: "{fonts.nativeFont}",
    "& > label": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "6px",
      fontSize: "clamp(0.875rem, 0.8529rem + 0.0941vw, 1rem)",
      fontWeight: "600",
      userSelect: "none",
      color: "{colors.foreground}",
      "& > span": {
        color: "{colors.errorFg}",
        fontSize: "0.8em",
      },
    },
    "& > input": {
      outline: "none",
      height: "40px",
      borderRadius: "{radii.md}",
      background: "{colors.background}",
      border: "1px solid transparent",
      padding: "{spacing.sm} {spacing.s12}",
      fontFamily: "inherit",
      color: "{colors.foreground}",
      fontSize: "0.9375rem",
      transition: "border-color 150ms ease-in, box-shadow 150ms ease-in",
      "&::placeholder": {
        color: "{colors.textMuted}",
      },
      "&:focus": {
        borderColor: "{colors.primary}",
        boxShadow: "0 0 0 3px color-mix(in srgb, {colors.primary} 15%, transparent)",
      },
      '&:disabled, &[disabled="true"], &[aria-disabled="true"]': {
        cursor: "not-allowed",
        background: "{colors.elevated}",
      },
    },
    "&:has(> label > span) > input": {
      borderColor: "{colors.errorFg}",
    },
    '& > input[type="number"]': {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: "0",
      },
    },
  },
})
