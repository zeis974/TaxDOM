import { styled } from "@/panda/jsx"

export const ErrorContainer = styled("div", {
  base: {
    padding: "{spacing.s20}",
    border: "1px solid {colors.errorFg}",
    borderRadius: "{radii.md}",
    backgroundColor: "{colors.errorBg}",
    color: "{colors.errorFg}",
    margin: "{spacing.md} 0",
  },
})

export const ErrorTitle = styled("h3", {
  base: {
    margin: "0 0 {spacing.sm}",
  },
})

export const ErrorMessage = styled("p", {
  base: {
    margin: "0 0 {spacing.s12}",
  },
})

export const RetryButton = styled("button", {
  base: {
    padding: "{spacing.sm} {spacing.md}",
    backgroundColor: "{colors.errorFg}",
    color: "{colors.background}",
    border: "none",
    borderRadius: "{radii.sm}",
    cursor: "pointer",
    marginTop: "{spacing.sm}",
    "&:hover": {
      opacity: "0.9",
    },
  },
})
