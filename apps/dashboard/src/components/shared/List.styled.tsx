import { styled } from "@/panda/jsx"

export const ListContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const ListGrid = styled("div", {
  base: {
    width: "inherit",
    height: "inherit",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "{spacing.md}",
  },
})

export const EmptyAction = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "{spacing.sm}",
    marginTop: "{spacing.sm}",
  },
})

export const EmptyState = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    minHeight: "320px",
    padding: "{spacing.xl} {spacing.lg}",
    textAlign: "center",
    color: "{colors.textMuted}",
    gap: "{spacing.md}",
    "& svg": {
      width: "52px",
      height: "52px",
      opacity: "0.3",
    },
    "& h3": {
      margin: "0",
      fontSize: "{fontSizes.headline-md}",
      fontWeight: "600",
      color: "{colors.foreground}",
    },
    "& p": {
      margin: "0",
      fontSize: "{fontSizes.body-sm}",
      maxWidth: "400px",
      lineHeight: "1.6",
    },
  },
})
