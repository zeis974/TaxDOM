import { styled } from "@/panda/jsx"

export const ButtonStyled = styled("button", {
  base: {
    height: "100%",
    padding: "10px 16px",
    background: "{colors.elevated}",
    fontWeight: "600",
    border: "1px solid transparent",
    cursor: "pointer",
    borderRadius: "{radii.md}",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    fontSize: "{fontSizes.body-sm}",
    transition: "all 150ms ease",
    '&[data-variant="primary"]': {
      background: "{colors.primary}",
      color: "{colors.background}",
      borderColor: "{colors.primary}",
    },
    '&[data-variant="primary"]:hover': {
      opacity: "0.85",
    },
    '&[data-variant="outline"]': {
      background: "transparent",
      borderColor: "{colors.elevated}",
      color: "{colors.foreground}",
    },
    '&[data-variant="outline"]:hover': {
      background: "{colors.elevated}",
      borderColor: "{colors.foreground}",
    },
    '&[data-variant="danger"]': {
      background: "{colors.errorBg}",
      color: "{colors.errorFg}",
      borderColor: "transparent",
    },
    '&[data-variant="danger"]:hover': {
      background: "color-mix(in srgb, {colors.errorFg} 25%, {colors.elevated})",
    },
    '&[data-variant="publish"]': {
      background: "{colors.primary}",
      color: "{colors.background}",
      borderColor: "transparent",
    },
    '&[data-variant="publish"]:hover': {
      opacity: "0.9",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.primary}",
      outlineOffset: "2px",
    },
    '&[disabled], &[aria-disabled="true"]': {
      cursor: "not-allowed",
      opacity: "0.5",
    },
  },
})
