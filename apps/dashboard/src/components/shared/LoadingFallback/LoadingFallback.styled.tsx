import { styled } from "@/panda/jsx"

export const LoadingFallbackContainer = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "200px",
    padding: "{spacing.lg}",
    fontSize: "{fontSizes.sm}",
    color: "{colors.foreground.muted}",
  },
})
