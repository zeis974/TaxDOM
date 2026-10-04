import { styled } from "@/panda/jsx"

export const PageContainer = styled("div", {
  base: {
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
})

export const PageHeaderRow = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    background: "{colors.background}",
    position: "sticky",
    top: "0",
    zIndex: "10",
  },
})

export const PageHeaderTitle = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
    "& h2": {
      margin: "0",
      fontSize: "{fontSizes.headline-lg}",
      fontWeight: "600",
    },
    "& span": {
      color: "{colors.textMuted}",
      fontSize: "{fontSizes.body-sm}",
      fontWeight: "500",
    },
  },
})

export const PageHeaderActions = styled("div", {
  base: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    gap: "10px",
  },
})
