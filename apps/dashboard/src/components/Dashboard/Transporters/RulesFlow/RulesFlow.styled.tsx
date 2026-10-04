import { styled } from "@/panda/jsx"

export const FlowContainer = styled("div", {
  base: {
    width: "100%",
    height: "100%",
    minHeight: "600px",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.lg}",
    overflow: "hidden",
    background: "{colors.background}",
    display: "flex",
    flexDirection: "column",
  },
})
export const FlowHeader = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "{spacing.md}",
    borderBottom: "1px solid {colors.border}",
    background: "{colors.elevated}",
  },
})
export const FlowTitle = styled("h3", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.body-md}",
    fontWeight: "600",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
  },
})
export const FlowActions = styled("div", {
  base: {
    display: "flex",
    gap: "{spacing.sm}",
    alignItems: "center",
  },
})
export const FlowSubtitle = styled("p", {
  base: {
    margin: "{spacing.xs} 0 0",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
  },
})
export const FlowTitleWrap = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
  },
})
export const FlowBody = styled("div", {
  base: {
    display: "flex",
    flex: "1",
    overflow: "hidden",
  },
})
export const FlowCanvas = styled("div", {
  base: {
    flex: "1",
    position: "relative",
  },
})
export const NodeBase = styled("div", {
  base: {
    padding: "{spacing.s12} {spacing.md}",
    borderRadius: "{radii.md}",
    minWidth: "150px",
    textAlign: "center",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    boxShadow: "0 2px 4px {colors.shadow}",
  },
})
export const StartNodeContainer = styled("div", {
  base: {
    padding: "14px 18px",
    borderRadius: "{radii.lg}",
    minWidth: "160px",
    textAlign: "center",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    background: "{colors.background}",
    border: "2px solid {colors.accentGreen}",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
  },
})
export const ConditionNodeContainer = styled("div", {
  base: {
    padding: "14px 18px",
    borderRadius: "{radii.lg}",
    minWidth: "220px",
    textAlign: "center",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    background: "{colors.background}",
    border: "2px solid {colors.border}",
    color: "{colors.foreground}",
    position: "relative",
    boxShadow: "0 18px 32px {colors.shadow}",
    fontFamily: "{fonts.nativeFont}",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    // One hue per condition type; the orphaned state overrides them all, so it has to stay last.
    '&[data-condition="eu"]': {
      borderColor: "{colors.accentPink}",
    },
    '&[data-condition="individual"]': {
      borderColor: "{colors.accentViolet}",
    },
    '&[data-condition="amount"]': {
      borderColor: "{colors.accentCyan}",
    },
    '&[data-orphaned="true"]': {
      borderColor: "{colors.errorFg}",
      boxShadow:
        "0 0 0 3px color-mix(in srgb, {colors.errorFg} 30%, transparent), 0 18px 32px {colors.shadow}",
    },
  },
})
export const FeeNodeContainer = styled("div", {
  base: {
    padding: "14px 18px",
    borderRadius: "{radii.lg}",
    minWidth: "160px",
    textAlign: "center",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    background: "{colors.background}",
    border: "2px solid {colors.accentOrange}",
    color: "{colors.foreground}",
    boxShadow: "0 18px 32px {colors.shadow}",
    fontFamily: "{fonts.nativeFont}",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    '&[data-orphaned="true"]': {
      borderColor: "{colors.errorFg}",
      boxShadow:
        "0 0 0 3px color-mix(in srgb, {colors.errorFg} 30%, transparent), 0 18px 32px {colors.shadow}",
    },
  },
})
export const NodeLabel = styled("div", {
  base: {
    fontWeight: "600",
    marginBottom: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "{spacing.sm}",
    fontFamily: "{fonts.nativeFont}",
  },
})
export const NodeValue = styled("div", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    opacity: "0.9",
    marginTop: "{spacing.xs}",
    fontFamily: "{fonts.nativeFont}",
  },
})
export const NodeIcon = styled("span", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      width: "18px",
      height: "18px",
    },
  },
})
export const HandleLabel = styled("span", {
  base: {
    position: "absolute",
    fontSize: "10px",
    fontWeight: "700",
    padding: "3px 8px",
    borderRadius: "6px",
    background: "{colors.background}",
    border: "1px solid {colors.border}",
    boxShadow: "0 10px 20px {colors.shadow}",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontFamily: "{fonts.nativeFont}",
  },
})
export const PageContainer = styled("div", {
  base: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "{colors.background}",
  },
})
export const PageHeader = styled("header", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    // asymmetric — leave as-is
    borderBottom: "1px solid {colors.border}",
    background: "{colors.elevated}",
  },
})
export const PageHeaderLeft = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.s12}",
  },
})
export const PageHeaderRight = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.s12}",
  },
})
export const PageBackButton = styled("button", {
  base: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "{colors.foreground}",
    padding: "{spacing.sm}",
    borderRadius: "{radii.md}",
    display: "flex",
    alignItems: "center",
    transition: "background 150ms",
    "&:hover": {
      background: "{colors.elevated}",
    },
    "& svg": {
      width: "20px",
      height: "20px",
    },
  },
})
export const PublishButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    padding: "{spacing.sm} {spacing.md}",
    background: "{colors.foreground}",
    color: "{colors.background}",
    border: "none",
    borderRadius: "{radii.md}",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "{fonts.nativeFont}",
    transition: "opacity 150ms",
    "&:hover:not(:disabled)": {
      opacity: "0.9",
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
    "& svg": {
      width: "16px",
      height: "16px",
    },
  },
})
export const FlowErrorState = styled("div", {
  base: {
    padding: "{spacing.xl}",
    textAlign: "center",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
  },
})
export const PageBody = styled("main", {
  base: {
    flex: "1",
    overflow: "hidden",
  },
})
export const NodeEditorPanel = styled("div", {
  base: {
    position: "relative",
    background: "{colors.background}",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.lg}",
    padding: "{spacing.s12}",
    minWidth: "0",
  },
})
export const NodeEditorTitle = styled("h4", {
  base: {
    margin: "0 0 {spacing.s12} 0",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    color: "{colors.foreground}",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "{fonts.nativeFont}",
  },
})
export const NodeEditorId = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    fontWeight: "400",
    color: "{colors.textMuted}",
    maxWidth: "50%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
})
/**
 * Outline variant of a destructive action — the shared Button's "danger" is a
 * filled tint, which reads too heavy inside a node editor panel.
 */
export const DeleteNodeButton = styled("button", {
  base: {
    padding: "{spacing.s12} {spacing.md}",
    border: "1px solid {colors.errorFg}",
    borderRadius: "{radii.md}",
    background: "transparent",
    color: "{colors.errorFg}",
    fontWeight: "600",
    fontSize: "{fontSizes.body-sm}",
    fontFamily: "{fonts.nativeFont}",
    cursor: "pointer",
    transition: "all 150ms ease",
    "&:hover": {
      background: "{colors.errorFg}",
      color: "{colors.background}",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.errorFg}",
      outlineOffset: "2px",
    },
  },
})
export const NodeEditorField = styled("div", {
  base: {
    marginBottom: "{spacing.s12}",
    "& label": {
      display: "block",
      fontSize: "{fontSizes.label-md}",
      fontWeight: "500",
      color: "{colors.textMuted}",
      marginBottom: "6px",
      fontFamily: "{fonts.nativeFont}",
    },
    "& input, & select": {
      width: "100%",
      padding: "{spacing.sm} {spacing.s12}",
      border: "1px solid {colors.border}",
      borderRadius: "6px",
      // no token for 6px — leave as-is
      fontSize: "{fontSizes.body-sm}",
      background: "{colors.background}",
      color: "{colors.foreground}",
      fontFamily: "{fonts.nativeFont}",
      "&:focus": {
        outline: "none",
        borderColor: "{colors.foreground}",
      },
    },
  },
})
export const NodeEditorActions = styled("div", {
  base: {
    display: "flex",
    gap: "{spacing.sm}",
    marginTop: "{spacing.md}",
  },
})
export const PaletteContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
    padding: "{spacing.s12}",
    background: "{colors.elevated}",
    borderRadius: "{radii.md}",
  },
})
export const PaletteItem = styled("div", {
  base: {
    padding: "10px 16px",
    background: "{colors.background}",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.md}",
    cursor: "grab",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    textAlign: "center",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    transition: "all 150ms",
    "&:hover": {
      borderColor: "{colors.foreground}",
      boxShadow: "0 2px 8px {colors.shadow}",
    },
  },
})
