import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    display: "flex",
    alignItems: "stretch",
    alignSelf: "stretch",
    marginLeft: "56px",
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
      transition: "background 150ms, color 150ms, opacity 150ms",
      color: "{colors.foreground}",
      background: "none",
      border: "none",
      font: "inherit",
      fontSize: "{fontSizes.body-md}",
      borderRadius: "{radii.md}",
      "&:hover": {
        opacity: "0.7",
      },
      "&:focus-visible": {
        outline: "2px solid {colors.primary}",
        outlineOffset: "2px",
      },
    },
    "& [data-chevron]": {
      transition: "transform 150ms",
      '&[data-open="true"]': {
        transform: "rotate(180deg)",
      },
    },
    "& > a": {
      alignSelf: "center",
      cursor: "pointer",
      textDecoration: "none",
    },
    '& > div:first-of-type[data-active="true"] > button': {
      color: "{colors.foreground}",
    },
  },
})
