import { styled } from "@/panda/jsx"

export const HintText = styled("span", {
  base: {
    display: "block",
    fontSize: "{fontSizes.label-md}",
    fontFamily: "{fonts.nativeFont}",
    color: "{colors.textMuted}",
    marginTop: "{spacing.xs}",
    lineHeight: "1.4",
  },
})

export const InputContainer = styled("div", {
  base: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    marginBottom: "0",
    fontFamily: "{fonts.nativeFont}",
    "& > label": {
      marginBottom: "6px",
      fontSize: "clamp(0.875rem, 0.8529rem + 0.0941vw, 1rem)",
      fontWeight: "600",
      userSelect: "none",
      color: "{colors.foreground}",
      "& > span": {
        color: "{colors.errorFg}",
        fontSize: "0.8em",
      },
      "&:has(span)": {
        "& ~ input, & ~ div > input": {
          borderColor: "{colors.errorFg}",
        },
      },
    },
    "& > input, & > div > input": {
      outline: "none",
      height: "40px",
      borderRadius: "{radii.md}",
      background: "{colors.elevated}",
      border: "1px solid {colors.elevated}",
      padding: "{spacing.sm} {spacing.s12}",
      fontFamily: "inherit",
      color: "{colors.foreground}",
      fontSize: "0.9375rem",
      transition: "border-color 150ms, box-shadow 150ms",
      "&::placeholder": {
        color: "{colors.textMuted}",
      },
      "&:focus": {
        borderColor: "{colors.primary}",
        boxShadow: "0 0 0 3px color-mix(in srgb, {colors.primary} 15%, transparent)",
      },
      '&[aria-invalid="true"]': {
        borderColor: "{colors.errorFg}",
        boxShadow: "0 0 0 3px color-mix(in srgb, {colors.errorFg} 15%, transparent)",
      },
      '&[disabled="true"], &[aria-disabled="true"]': {
        cursor: "not-allowed",
        background: "{colors.elevated}",
      },
    },
    '& > input[type="number"], & > div > input[type="number"]': {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: "0",
      },
    },
  },
})
