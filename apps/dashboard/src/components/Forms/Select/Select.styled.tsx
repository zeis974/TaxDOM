import { styled } from "@/panda/jsx"

export const HintText = styled("span", {
  base: {
    display: "block",
    fontSize: "0.75rem",
    fontFamily: "{fonts.nativeFont}",
    color: "{colors.textMuted}",
    marginTop: "{spacing.xs}",
    lineHeight: "1.4",
  },
})

export const LoadingCircle = styled("div", {
  base: {
    position: "absolute",
    right: "12px",
    bottom: "10px",
    border: "2px solid {colors.primary}",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    animation: "rotate 1s linear infinite",
    opacity: "1",
    transition: "opacity 250ms",
  },
})

export const OptionContainer = styled("ul", {
  base: {
    width: "100%",
    borderRadius: "{radii.md}",
    top: "calc(100% + 6px)",
    zIndex: "1",
    position: "absolute",
    border: "1px solid {colors.border}",
    background: "{colors.background}",
    boxShadow: "0 10px 30px {colors.shadow}",
    overflow: "hidden",
    '& > li[data-selected="true"], & > div > li[data-selected="true"]': {
      background: "color-mix(in srgb, {colors.primary} 12%, transparent)",
      color: "{colors.primary}",
      fontWeight: "600",
    },
    "& > li, & > div > li": {
      cursor: "pointer",
      display: "block",
      transition: "background 150ms",
      boxSizing: "border-box",
      color: "{colors.foreground}",
      padding: "{spacing.sm} {spacing.s12}",
      fontSize: "0.9375rem",
      '&[data-available="false"]': {
        opacity: "0.5",
        cursor: "not-allowed",
      },
    },
    "& > div > li": {
      position: "absolute",
    },
    '& > li:not([style*="position: absolute"])': {
      position: "relative",
    },
  },
})
