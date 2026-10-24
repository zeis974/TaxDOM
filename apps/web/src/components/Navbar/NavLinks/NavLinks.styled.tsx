import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    display: "flex",
    alignItems: "stretch",
    alignSelf: "stretch",
    marginLeft: "{spacing.lg}",
    gap: "{spacing.lg}",
    fontFamily: "{fonts.nativeFont}",
    // Anchors the mega menu under the trigger and keeps it above the page content
    "& > div:first-of-type": {
      position: "relative",
      zIndex: "3",
      display: "flex",
      alignItems: "center",
      alignSelf: "stretch",
    },
    "& > a, & > div:first-of-type > button": {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.xs}",
      padding: "{spacing.sm} {spacing.md}",
      transition: "background 150ms, color 150ms",
      color: "{colors.textMuted}",
      background: "none",
      border: "none",
      font: "inherit",
      fontSize: "{fontSizes.body-md}",
      cursor: "pointer",
      borderRadius: "{radii.md}",
      "&:hover": {
        color: "{colors.foreground}",
      },
      "&:focus-visible": {
        outline: "2px solid {colors.primary}",
        outlineOffset: "2px",
      },
    },
    "& > a": {
      alignSelf: "center",
      textDecoration: "none",
    },
    '& > div:first-of-type[data-active="true"] > button': {
      color: "{colors.foreground}",
    },
  },
})
