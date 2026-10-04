import { styled } from "@/panda/jsx"

export const ErrorContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    padding: "40px",
    textAlign: "center",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const ErrorTitle = styled("h1", {
  base: {
    fontSize: "{fontSizes.headline-lg}",
    marginBottom: "{spacing.sm}",
    color: "{colors.errorFg}",
  },
})

export const ErrorMessage = styled("p", {
  base: {
    color: "{colors.textMuted}",
    marginBottom: "{spacing.lg}",
  },
})

export const RetryButton = styled("button", {
  base: {
    padding: "10px 24px",
    background: "{colors.foreground}",
    color: "{colors.background}",
    border: "none",
    borderRadius: "{radii.md}",
    cursor: "pointer",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    "&:hover": {
      opacity: "0.9",
    },
  },
})
