import { styled } from "@/panda/jsx"

export const PageLayout = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    height: "calc(100svh - 20px)",
    gap: "10px",
    overflow: "hidden",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const ChapterPanel = styled("aside", {
  base: {
    background: "{colors.elevated}",
    borderRadius: "{radii.lg}",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid {colors.border}",
  },
})

export const ChapterPanelHeader = styled("div", {
  base: {
    padding: "{spacing.md}",
    borderBottom: "1px solid {colors.border}",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flexShrink: "0",
  },
})

export const ChapterPanelTitle = styled("h2", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "{colors.foreground}",
    opacity: "0.7",
  },
})

export const SearchInput = styled("input", {
  base: {
    background: "{colors.elevated}",
    border: "1px solid transparent",
    borderRadius: "{radii.md}",
    padding: "{spacing.sm} {spacing.s12} {spacing.sm} {spacing.xl}",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    outline: "none",
    boxSizing: "border-box",
    width: "220px",
    transition: "border-color 120ms ease, width 200ms ease",
    "&::placeholder": {
      color: "{colors.textMuted}",
    },
    "&:focus": {
      borderColor: "{colors.primary}",
      width: "260px",
    },
  },
})

/* Chapter-panel search — full width, no left icon */
export const ChapterSearchInput = styled("input", {
  base: {
    width: "100%",
    background: "{colors.elevated}",
    border: "1px solid transparent",
    borderRadius: "{radii.md}",
    padding: "{spacing.sm} {spacing.s12}",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    outline: "none",
    boxSizing: "border-box",
    "&::placeholder": {
      color: "{colors.textMuted}",
    },
    "&:focus": {
      borderColor: "{colors.primary}",
    },
  },
})

export const ChapterList = styled("ul", {
  base: {
    flex: "1",
    overflowY: "auto",
    padding: "{spacing.sm}",
    margin: "0",
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
})

export const ChapterItem = styled("button", {
  base: {
    width: "100%",
    textAlign: "left",
    background: "transparent",
    border: "none",
    borderRadius: "{radii.md}",
    padding: "8px 10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    transition: "background 120ms ease",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    animation: "fadeIn 0.28s ease both",
    "&:hover": {
      background: "{colors.elevated}",
    },
    '&[data-active="true"]': {
      background: "color-mix(in srgb, {colors.primary} 12%, transparent)",
      color: "{colors.primary}",
    },
  },
})

export const ChapterCode = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    fontWeight: "700",
    fontVariantNumeric: "tabular-nums",
    minWidth: "24px",
    opacity: "0.6",
  },
})

export const ChapterDescription = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    flex: "1",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: "1.4",
  },
})

export const ChapterBadge = styled("span", {
  base: {
    fontSize: "10px",
    fontWeight: "700",
    background: "{colors.infoBg}",
    color: "{colors.infoFg}",
    padding: "2px 7px",
    borderRadius: "{radii.full}",
    flexShrink: "0",
  },
})

export const TreePanel = styled("main", {
  base: {
    background: "{colors.elevated}",
    borderRadius: "{radii.lg}",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid {colors.border}",
  },
})

export const TreePanelHeader = styled("div", {
  base: {
    padding: "14px 20px",
    borderBottom: "1px solid {colors.border}",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "{spacing.md}",
    flexShrink: "0",
    minWidth: "0",
  },
})

/* Left: chapter number + text block */
export const HeaderInfo = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flex: "1",
    minWidth: "0",
    animation: "fadeIn 0.28s ease both",
  },
})

export const ChapterNum = styled("span", {
  base: {
    fontSize: "28px",
    fontWeight: "800",
    color: "{colors.primary}",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "-0.03em",
    lineHeight: "1",
    flexShrink: "0",
  },
})

export const HeaderText = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: "0",
  },
})

export const TreeTitle = styled("h2", {
  base: {
    margin: "0",
    fontSize: "15px",
    fontWeight: "600",
    color: "{colors.foreground}",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
})

export const TreeSubtitle = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    color: "{colors.textMuted}",
    fontWeight: "400",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
})

/* Right: search + sync */
export const HeaderActions = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    flexShrink: "0",
  },
})

export const SearchWrapper = styled("div", {
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
})

export const LastSyncLabel = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    color: "{colors.textMuted}",
    whiteSpace: "nowrap",
    flexShrink: "0",
    '&[data-status="error"]': {
      color: "{colors.errorFg}",
    },
  },
})

export const SearchIcon = styled("svg", {
  base: {
    position: "absolute",
    left: "10px",
    width: "14px",
    height: "14px",
    color: "{colors.textMuted}",
    pointerEvents: "none",
    flexShrink: "0",
  },
})

/* Keep TreePanelTitle as a stub for backwards compat — unused in new header */
export const TreePanelTitle = styled("div", {
  base: {},
})

export const SyncButton = styled("button", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    padding: "0",
    background: "{colors.infoBg}",
    color: "{colors.infoFg}",
    border: "1px solid transparent",
    borderRadius: "{radii.md}",
    cursor: "pointer",
    transition: "all 150ms ease",
    flexShrink: "0",
    "&:hover:not(:disabled)": {
      background: "color-mix(in srgb, {colors.primary} 20%, {colors.elevated})",
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
      animation: "spin 1s linear infinite",
    },
  },
})

export const SyncProgress = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.textMuted}",
  },
})

export const ProgressBar = styled("div", {
  base: {
    position: "relative",
    height: "4px",
    width: "120px",
    background: "{colors.elevated}",
    borderRadius: "2px",
    overflow: "hidden",
  },
})

export const ProgressFill = styled("div", {
  base: {
    position: "absolute",
    inset: "0 auto 0 0",
    width: "var(--progress-width, 0%)",
    background: "{colors.primary}",
    borderRadius: "2px",
    transition: "width 400ms ease",
  },
})

export const TreeBody = styled("div", {
  base: {
    flex: "1",
    overflowY: "auto",
    padding: "{spacing.md} {spacing.s20}",
  },
})

export const EmptyState = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: "{spacing.s12}",
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.body-sm}",
    textAlign: "center",
    padding: "48px 32px",
  },
})

export const EmptyIcon = styled("div", {
  base: {
    fontSize: "48px",
    opacity: "0.4",
  },
})

export const TreeNodeRow = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 8px",
    borderRadius: "6px",
    // no token for 6px — leave as-is
    cursor: "pointer",
    transition: "background 100ms ease",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.foreground}",
    "&:hover": {
      background: "{colors.elevated}",
    },
    '&[data-has-products="true"]': {
      color: "{colors.foreground}",
      fontWeight: "500",
    },
    '&[data-highlighted="true"]': {
      background: "{colors.warningBg}",
      outline: "1px solid {colors.warningFg}",
      borderRadius: "6px",
      animation: "highlightPulse 1.2s ease-out forwards",
    },
  },
})

export const NodeIndent = styled("div", {
  base: {
    flexShrink: "0",
    width: "var(--indent-width, 0px)",
  },
})

export const NodeToggle = styled("button", {
  base: {
    background: "{colors.elevated}",
    border: "1px solid {colors.border}",
    padding: "0",
    width: "16px",
    height: "16px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "{colors.textMuted}",
    flexShrink: "0",
    borderRadius: "3px",
    transition: "background 100ms ease, border-color 100ms ease, color 100ms ease",
    "&:hover": {
      background: "color-mix(in srgb, {colors.primary} 12%, transparent)",
      borderColor: "{colors.primary}",
      color: "{colors.primary}",
    },
  },
})

export const NodeCode = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    fontWeight: "700",
    fontVariantNumeric: "tabular-nums",
    background: "{colors.elevated}",
    padding: "2px 6px",
    borderRadius: "{radii.sm}",
    flexShrink: "0",
    letterSpacing: "0.02em",
  },
})

export const NodeDescription = styled("span", {
  base: {
    flex: "1",
    lineHeight: "1.4",
  },
})

export const NodeProductBadge = styled("span", {
  base: {
    fontSize: "10px",
    fontWeight: "700",
    background: "{colors.successBg}",
    color: "{colors.successFg}",
    padding: "2px 8px",
    borderRadius: "{radii.full}",
    flexShrink: "0",
  },
})

export const LoadingRow = styled("div", {
  base: {
    padding: "{spacing.sm} {spacing.s12}",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.textMuted}",
    animation: "pulse 1.5s ease-in-out infinite",
  },
})

export const ErrorRow = styled("div", {
  base: {
    padding: "{spacing.s12} {spacing.md}",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.errorFg}",
    background: "{colors.errorBg}",
    borderRadius: "{radii.md}",
    margin: "{spacing.sm} 0",
  },
})

export const SuggestionList = styled("div", {
  base: {
    position: "fixed",
    zIndex: "200",
    minWidth: "340px",
    maxWidth: "480px",
    maxHeight: "260px",
    overflowY: "auto",
    background: "{colors.elevated}",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.lg}",
    boxShadow: "0 12px 32px {colors.shadow}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const SuggestionItem = styled("button", {
  base: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
    padding: "9px 14px",
    width: "100%",
    background: "none",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "{fonts.nativeFont}",
    color: "{colors.foreground}",
    transition: "background 100ms ease",
    "&:first-child": {
      borderRadius: "{radii.lg} {radii.lg} 0 0",
    },
    "&:last-child": {
      borderRadius: "0 0 {radii.lg} {radii.lg}",
    },
    "&:hover": {
      background: "{colors.elevated}",
    },
  },
})

// ── Skeleton ──────────────────────────────────────────────────────────────────

export const SkeletonRect = styled("span", {
  base: {
    display: "block",
    borderRadius: "{radii.sm}",
    background:
      "linear-gradient( 90deg, {colors.elevated} 25%, {colors.border} 50%, {colors.elevated} 75% )",
    backgroundSize: "200% 100%",
    animation: "skeleton-shimmer 1.6s ease-in-out infinite",
  },
})

// ── Suggestions ───────────────────────────────────────────────────────────────

export const SuggestionCode = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    fontWeight: "700",
    fontVariantNumeric: "tabular-nums",
    background: "{colors.infoBg}",
    color: "{colors.infoFg}",
    padding: "2px 7px",
    borderRadius: "{radii.sm}",
    flexShrink: "0",
    letterSpacing: "0.02em",
  },
})

export const SuggestionDescription = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    flex: "1",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "{colors.foreground}",
    opacity: "0.8",
  },
})
