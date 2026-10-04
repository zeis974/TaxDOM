import { styled } from "@/panda/jsx"

export const PendingContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "{spacing.sm}",
    width: "100%",
    height: "100%",
    minHeight: "200px",
    color: "{colors.foreground.muted}",
  },
})

export const Spinner = styled("div", {
  base: {
    width: "28px",
    height: "28px",
    border: "3px solid {colors.border.subtle}",
    borderTopColor: "{colors.primary}",
    borderRadius: "{radii.full}",
    animation: "spin 0.8s linear infinite",
  },
})

export const PendingText = styled("span", {
  base: {
    fontSize: "{fontSizes.sm}",
    color: "{colors.foreground.muted}",
  },
})
