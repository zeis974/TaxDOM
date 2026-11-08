import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Panel = styled(m.div, {
  base: {
    position: "absolute",
    top: "calc(100% + {spacing.s12})",
    left: "calc({spacing.xl} * -2)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "{spacing.md}",
    width: "min(880px, calc(100vw - {spacing.xl}))",
    padding: "{spacing.md}",
    color: "{colors.foreground}",
    background: "{colors.background}",
    // Interaction state, not a resting border: the panel only exists while open, over a navbar
    // of the same surface where the shadow alone leaves its top edge invisible
    border: "1px solid color-mix(in srgb, {colors.border} 30%, transparent)",
    borderRadius: "{radii.lg}",
    boxShadow: "0 32px 64px -24px {colors.shadow}, 0 8px 24px -8px {colors.shadow}",
    // Hover bridge over the gap so the pointer can reach the panel without leaving the trigger
    "&::before": {
      content: '""',
      position: "absolute",
      insetInline: "0",
      bottom: "100%",
      height: "{spacing.s12}",
    },
    // Caret pointing at the trigger
    "&::after": {
      content: '""',
      position: "absolute",
      top: "calc({spacing.s12} / -2)",
      left: "calc({spacing.xl} * 2 + {spacing.lg})",
      width: "{spacing.s12}",
      height: "{spacing.s12}",
      background: "{colors.background}",
      borderTop: "1px solid color-mix(in srgb, {colors.border} 30%, transparent)",
      borderLeft: "1px solid color-mix(in srgb, {colors.border} 30%, transparent)",
      rotate: "45deg",
    },
    // Too narrow to hang the panel off the trigger
    "@media (width < 1080px)": {
      position: "fixed",
      top: "{sizes.navbarHeight}",
      insetInline: "{spacing.md}",
      width: "auto",
      maxHeight: "calc(100dvh - {sizes.navbarHeight} - {spacing.md})",
      overflowY: "auto",
      overscrollBehavior: "contain",
      "&::after": {
        display: "none",
      },
    },
  },
})

export const Tools = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
  },
})

export const GroupLabel = styled("p", {
  base: {
    marginTop: "{spacing.s12}",
    padding: "{spacing.xs} {spacing.s12}",
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.label-md}",
    fontWeight: "600",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
})

export const List = styled("ul", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
    listStyle: "none",
  },
})

export const ToolRow = styled("li", {
  base: {
    "& > a, & > button": {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center",
      gap: "{spacing.md}",
      width: "100%",
      padding: "{spacing.s12}",
      border: "none",
      borderRadius: "{radii.lg}",
      background: "none",
      color: "{colors.foreground}",
      font: "inherit",
      textAlign: "left",
      textDecoration: "none",
      cursor: "pointer",
      transition: "background 150ms",
      "&:focus-visible": {
        outline: "2px solid {colors.primary}",
        outlineOffset: "-2px",
      },
    },
    // Upcoming tools: muted name and desaturated icon
    "& > button": {
      cursor: "default",
      color: "{colors.textMuted}",
      "& > span:first-child": {
        filter: "grayscale(1)",
        opacity: "0.5",
      },
    },
    '&[data-active="true"] > a, &[data-active="true"] > button': {
      background: "{colors.elevated}",
    },
    '&[data-active="true"] > a > span:last-child': {
      opacity: "1",
      translate: "0",
    },
  },
})

// Spans only: the upcoming rows are buttons, which accept phrasing content alone
export const ToolIcon = styled("span", {
  base: {
    display: "grid",
    flexShrink: "0",
    "& svg": {
      width: "{sizes.toolIcon}",
      height: "{sizes.toolIcon}",
    },
  },
})

export const ToolText = styled("span", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
  },
})

export const ToolName = styled("span", {
  base: {
    fontSize: "{fontSizes.body-md}",
    fontWeight: "600",
  },
})

export const ToolSummary = styled("span", {
  base: {
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.body-sm}",
  },
})

export const ToolArrow = styled("span", {
  base: {
    display: "grid",
    color: "{colors.primary}",
    opacity: "0",
    translate: "calc({spacing.xs} * -1) 0",
    transition: "opacity 150ms, translate 150ms",
  },
})

export const Preview = styled("div", {
  base: {
    position: "relative",
    display: "grid",
    minHeight: "360px",
    overflow: "hidden",
    borderRadius: "{radii.lg}",
    background: "{colors.elevated}",
  },
})

export const PreviewContent = styled(m.div, {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
    padding: "{spacing.lg}",
  },
})

export const PreviewHeader = styled("div", {
  base: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "{spacing.md}",
  },
})

export const PreviewName = styled("p", {
  base: {
    fontSize: "{fontSizes.headline-md}",
    fontWeight: "700",
  },
})

export const PreviewDescription = styled("p", {
  base: {
    maxWidth: "32ch",
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.body-sm}",
    lineHeight: "1.5",
  },
})

export const Badge = styled("span", {
  base: {
    flexShrink: "0",
    padding: "{spacing.xs} {spacing.sm}",
    borderRadius: "{radii.full}",
    background: "{colors.infoBg}",
    color: "{colors.infoFg}",
    fontSize: "{fontSizes.label-md}",
    fontWeight: "600",
  },
})
