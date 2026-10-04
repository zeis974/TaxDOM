import { styled } from "@/panda/jsx"

/* ---------------------------------- Chrome --------------------------------- */

export const DrawerOverlay = styled("div", {
  base: {
    position: "fixed",
    inset: "0",
    background: "{colors.overlay}",
    backdropFilter: "blur(4px)",
    zIndex: "49",
  },
})

export const DrawerContent = styled("div", {
  base: {
    position: "fixed",
    inset: "0 0 0 auto",
    width: "min(460px, 100vw)",
    height: "100vh",
    background: "{colors.background}",
    borderLeft: "1px solid {colors.border}",
    boxShadow: "-32px 0 80px {colors.shadow}",
    display: "flex",
    flexDirection: "column",
    zIndex: "50",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const DrawerHeader = styled("header", {
  base: {
    padding: "{spacing.md}",
    paddingBottom: "{spacing.s12}",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid {colors.border}",
  },
})

export const DrawerHeaderContent = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
  },
})

export const DrawerHeaderActions = styled("div", {
  base: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },
})

export const DrawerTitle = styled("h2", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.headline-lg}",
    fontWeight: "600",
    color: "{colors.foreground}",
    letterSpacing: "-0.02em",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const DrawerMeta = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "{spacing.sm}",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.textMuted}",
  },
})

export const DrawerCloseButton = styled("button", {
  base: {
    background: "{colors.elevated}",
    color: "{colors.foreground}",
    border: "none",
    borderRadius: "{radii.full}",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "600",
    transition: "background 150ms ease",
    "&:hover": {
      background: "{colors.elevated}",
    },
  },
})

export const HeaderActionButton = styled("button", {
  base: {
    background: "transparent",
    color: "{colors.textMuted}",
    border: "none",
    borderRadius: "{radii.md}",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 150ms ease",
    "&:hover": {
      background: "{colors.elevated}",
      color: "{colors.foreground}",
    },
  },
})

/* ----------------------------- Top Bar (Rippling) -------------------------- */

export const DrawerTopBar = styled("header", {
  base: {
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid {colors.border}",
    flexShrink: "0",
  },
})

export const DrawerTopBarLeft = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.s12}",
  },
})

export const DrawerTopBarRight = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
  },
})

export const DrawerTopBarLabel = styled("span", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const DrawerNavGroup = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.xs}",
  },
})

export const DrawerNavButton = styled("button", {
  base: {
    background: "{colors.elevated}",
    color: "{colors.textMuted}",
    border: "none",
    borderRadius: "{radii.full}",
    width: "28px",
    height: "28px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "{fontSizes.body-sm}",
    transition: "background 150ms ease, color 150ms ease",
    "&:hover:not(:disabled)": {
      background: "{colors.elevated}",
      color: "{colors.foreground}",
    },
    "&:disabled": {
      opacity: "0.4",
      cursor: "not-allowed",
    },
  },
})

export const DrawerNavCounter = styled("span", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
    minWidth: "52px",
    textAlign: "center",
  },
})

/* ----------------------------- Hero (Rippling) ----------------------------- */

export const DrawerHero = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "{spacing.lg}",
    borderBottom: "1px solid {colors.border}",
    gap: "{spacing.md}",
  },
})

export const DrawerHeroIdentity = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.md}",
    minWidth: "0",
  },
})

export const DrawerHeroAvatar = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    width: "44px",
    height: "44px",
    borderRadius: "{radii.full}",
    background: "{colors.infoBg}",
    color: "{colors.infoFg}",
    fontFamily: "{fonts.nativeFont}",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    letterSpacing: "0.02em",
    "& svg": {
      width: "22px",
      height: "22px",
    },
  },
})

export const DrawerHeroText = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
    minWidth: "0",
  },
})

export const DrawerHeroTitle = styled("h2", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.headline-md}",
    fontWeight: "600",
    color: "{colors.foreground}",
    letterSpacing: "-0.02em",
    fontFamily: "{fonts.nativeFont}",
    lineHeight: "1.25",
  },
})

export const DrawerHeroActions = styled("div", {
  base: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    flexShrink: "0",
  },
})

/* ----------------------------------- Body ---------------------------------- */

export const DrawerForm = styled("form", {
  base: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
})

export const DrawerBody = styled("div", {
  base: {
    flex: "1",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "{spacing.s20} {spacing.lg}",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.md}",
  },
})

export const DrawerSection = styled("section", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.md}",
  },
})

export const DrawerSectionTitle = styled("h3", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const DrawerSectionDescription = styled("p", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.textMuted}",
    lineHeight: "1.6",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const FormGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "{spacing.md}",
  },
})

export const ToggleRow = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "{spacing.md}",
    "& > span": {
      fontSize: "{fontSizes.body-sm}",
      fontWeight: "500",
      color: "{colors.foreground}",
    },
  },
})

export const Divider = styled("div", {
  base: {
    height: "1px",
    background: "{colors.border}",
  },
})

/* ---------------------------- Detail (read-only) --------------------------- */

export const DetailList = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
  },
})

export const DetailRow = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid {colors.border}",
    gap: "{spacing.md}",
    "&:last-child": {
      borderBottom: "none",
    },
  },
})

export const DetailLabel = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
    minWidth: "0",
    flexShrink: "0",
  },
})

export const DetailIcon = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "{radii.md}",
    background: "{colors.elevated}",
    color: "{colors.textMuted}",
    flexShrink: "0",
  },
})

export const DetailValue = styled("span", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    textAlign: "right",
    minWidth: "0",
    wordBreak: "break-word",
  },
})

export const DetailValueInput = styled("input", {
  base: {
    padding: "6px 10px",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.md}",
    fontSize: "{fontSizes.body-sm}",
    background: "{colors.elevated}",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    maxWidth: "200px",
    width: "100%",
    textAlign: "right",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    "&:focus": {
      outline: "none",
      borderColor: "{colors.primary}",
      boxShadow: "0 0 0 3px color-mix(in srgb, {colors.primary} 12%, transparent)",
    },
  },
})

export const DetailValueSelect = styled("select", {
  base: {
    padding: "6px 10px",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.md}",
    fontSize: "{fontSizes.body-sm}",
    background: "{colors.elevated}",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    maxWidth: "200px",
    width: "100%",
    cursor: "pointer",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    "&:focus": {
      outline: "none",
      borderColor: "{colors.primary}",
      boxShadow: "0 0 0 3px color-mix(in srgb, {colors.primary} 12%, transparent)",
    },
  },
})

export const DetailValueCopyable = styled("button", {
  base: {
    background: "none",
    border: "none",
    padding: "0",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    "&:hover": {
      color: "{colors.primary}",
    },
  },
})

export const StatusTagButton = styled("button", {
  base: {
    padding: "6px 14px",
    borderRadius: "{radii.full}",
    border: "1px solid {colors.border}",
    background: "{colors.elevated}",
    color: "{colors.foreground}",
    fontSize: "{fontSizes.label-md}",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "{fonts.nativeFont}",
    '&[data-active="true"]': {
      background: "{colors.foreground}",
      color: "{colors.background}",
      borderColor: "{colors.foreground}",
    },
  },
})

/* ---------------------------------- Footer --------------------------------- */

export const DrawerFooter = styled("footer", {
  base: {
    padding: "{spacing.md} {spacing.lg} {spacing.lg}",
    borderTop: "1px solid {colors.border}",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "{spacing.md}",
  },
})

export const ActionsGroup = styled("div", {
  base: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
})

export const ErrorContainer = styled("div", {
  base: {
    color: "{colors.errorFg}",
    flex: "1",
    fontFamily: "{fonts.nativeFont}",
    minWidth: "220px",
    "& span": {
      display: "block",
      marginBottom: "6px",
    },
  },
})

export const DeleteButton = styled("button", {
  base: {
    background: "{colors.errorBg}",
    color: "{colors.errorFg}",
    border: "none",
    borderRadius: "{radii.md}",
    padding: "10px 18px",
    cursor: "pointer",
    fontFamily: "{fonts.nativeFont}",
    fontWeight: "600",
    transition: "filter 150ms ease",
    "&:hover:not(:disabled)": {
      filter: "brightness(0.95)",
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
})

export const RulesEditorButton = styled("button", {
  base: {
    background: "{colors.infoBg}",
    color: "{colors.infoFg}",
    border: "none",
    borderRadius: "{radii.md}",
    padding: "10px 18px",
    cursor: "pointer",
    fontFamily: "{fonts.nativeFont}",
    fontWeight: "600",
    transition: "filter 150ms ease",
    "&:hover:not(:disabled)": {
      filter: "brightness(0.97)",
    },
  },
})

/* --------------------------------- Timeline -------------------------------- */

export const TimelineContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
})

export const TimelineItem = styled("div", {
  base: {
    display: "flex",
    gap: "{spacing.md}",
    position: "relative",
    paddingBottom: "{spacing.lg}",
    "&:last-child": {
      paddingBottom: "0",
    },
  },
})

export const TimelineIconWrapper = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    zIndex: "1",
    flexShrink: "0",
  },
})

export const TimelineIcon = styled("div", {
  base: {
    width: "32px",
    height: "32px",
    borderRadius: "{radii.full}",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "0",
    '&[data-status="success"]': {
      background: "{colors.successBg}",
      color: "{colors.successFg}",
    },
    '&[data-status="info"]': {
      background: "{colors.infoBg}",
      color: "{colors.infoFg}",
    },
    '&[data-status="warning"]': {
      background: "{colors.warningBg}",
      color: "{colors.warningFg}",
    },
  },
})

export const TimelineConnector = styled("div", {
  base: {
    width: "2px",
    flex: "1",
    background: "{colors.border}",
    marginTop: "{spacing.sm}",
    minHeight: "16px",
  },
})

export const TimelineContent = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
    paddingTop: "{spacing.xs}",
    minWidth: "0",
  },
})

export const TimelineTitle = styled("span", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const TimelineDescription = styled("span", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
    lineHeight: "1.5",
  },
})

export const TimelineDate = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
  },
})

/* ========================= Detail Drawer (read-only hero) ===================== */

export const DetailDrawerHeader = styled("header", {
  base: {
    padding: "{spacing.s20} {spacing.lg}",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottom: "1px solid {colors.border}",
    flexShrink: "0",
    gap: "{spacing.md}",
  },
})

export const DetailDrawerHeaderLeft = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: "0",
    flex: "1",
  },
})

export const DetailDrawerHeaderTitle = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "{colors.textMuted}",
    fontWeight: "600",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const DetailDrawerTitle = styled("h2", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.headline-md}",
    fontWeight: "600",
    color: "{colors.foreground}",
    letterSpacing: "-0.02em",
    fontFamily: "{fonts.nativeFont}",
    lineHeight: "1.25",
  },
})

export const DetailDrawerNavGroup = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexShrink: "0",
  },
})

export const DetailDrawerNavButton = styled("button", {
  base: {
    width: "28px",
    height: "28px",
    borderRadius: "{radii.full}",
    border: "1px solid {colors.border}",
    background: "{colors.background}",
    color: "{colors.textMuted}",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 150ms ease",
    "&:hover:not(:disabled)": {
      borderColor: "{colors.border}",
      color: "{colors.foreground}",
      background: "{colors.elevated}",
    },
    "&:disabled": {
      opacity: "0.45",
      cursor: "not-allowed",
    },
  },
})

export const DetailDrawerCounter = styled("span", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
    minWidth: "64px",
    textAlign: "center",
  },
})

export const DetailDrawerHero = styled("div", {
  base: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "{spacing.s12}",
    paddingBottom: "{spacing.xs}",
  },
})

export const DetailDrawerHeroTitle = styled("h2", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.headline-md}",
    fontWeight: "600",
    color: "{colors.foreground}",
    letterSpacing: "-0.02em",
    fontFamily: "{fonts.nativeFont}",
    lineHeight: "1.25",
  },
})

export const DetailDrawerHeroActions = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    flexShrink: "0",
  },
})

export const DetailDrawerIconButton = styled("button", {
  base: {
    width: "32px",
    height: "32px",
    borderRadius: "{radii.md}",
    border: "1px solid {colors.border}",
    background: "{colors.background}",
    color: "{colors.textMuted}",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 150ms ease",
    "&:hover": {
      borderColor: "{colors.border}",
      color: "{colors.foreground}",
      background: "{colors.elevated}",
    },
  },
})

export const DetailDrawerFooter = styled("footer", {
  base: {
    padding: "{spacing.md} {spacing.lg} {spacing.lg}",
    borderTop: "1px solid {colors.border}",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "{spacing.s12}",
  },
})

export const DetailDrawerBody = styled("div", {
  base: {
    flex: "1",
    overflowY: "auto",
    padding: "{spacing.s20} {spacing.lg}",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.s20}",
  },
})

/* ----------------------------- Detail meta list ----------------------------- */

export const DetailMetaList = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
})

export const DetailMetaRow = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "24px 1fr",
    alignItems: "center",
    gap: "{spacing.s12}",
    padding: "{spacing.sm} 0",
    borderBottom: "1px solid {colors.border}",
    "&:last-child": {
      borderBottom: "none",
    },
  },
})

export const DetailMetaLabel = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    fontSize: "{fontSizes.body-sm}",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const DetailMetaIcon = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    color: "{colors.textMuted}",
    flexShrink: "0",
  },
})

export const DetailMetaValue = styled("div", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    minWidth: "0",
  },
})

export const DetailMetaDescription = styled("p", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.body-sm}",
    lineHeight: "1.5",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const DetailReadMore = styled("button", {
  base: {
    background: "none",
    border: "none",
    padding: "0",
    margin: "0",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    color: "{colors.primary}",
    cursor: "pointer",
    fontFamily: "{fonts.nativeFont}",
    "&:hover": {
      textDecoration: "underline",
    },
  },
})

/* ----------------------------------- Pills ---------------------------------- */

export const StatusPill = styled("button", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 12px",
    borderRadius: "{radii.full}",
    fontSize: "{fontSizes.label-md}",
    fontWeight: "600",
    border: "1px solid transparent",
    cursor: "pointer",
    fontFamily: "{fonts.nativeFont}",
    transition: "all 150ms ease",
    '&[data-type="doing"]': {
      background: "{colors.infoBg}",
      color: "{colors.infoFg}",
    },
    '&[data-type="done"]': {
      background: "{colors.successBg}",
      color: "{colors.successFg}",
    },
    '&[data-type="todo"]': {
      background: "{colors.elevated}",
      color: "{colors.foreground}",
      borderColor: "{colors.border}",
    },
    '&[data-type="low"]': {
      background: "{colors.successBg}",
      color: "{colors.successFg}",
    },
    '&[data-type="medium"]': {
      background: "{colors.warningBg}",
      color: "{colors.warningFg}",
    },
    '&[data-type="high"]': {
      background: "{colors.errorBg}",
      color: "{colors.errorFg}",
    },
    '&[data-type="category"]': {
      background: "{colors.infoBg}",
      color: "{colors.infoFg}",
    },
  },
})

export const StatusPillDot = styled("span", {
  base: {
    width: "6px",
    height: "6px",
    borderRadius: "{radii.full}",
    background: "currentColor",
    flexShrink: "0",
  },
})

/* ------------------------------ Detail sections ----------------------------- */

export const DetailSectionHeader = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "{spacing.s12}",
    marginBottom: "{spacing.s12}",
  },
})

export const DetailSectionTitleGroup = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}",
  },
})

export const DetailSectionTitle = styled("h3", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.label-md}",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
})

export const DetailSectionCount = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    fontWeight: "600",
    color: "{colors.textMuted}",
    background: "{colors.elevated}",
    padding: "2px 8px",
    borderRadius: "{radii.full}",
    minWidth: "22px",
    textAlign: "center",
  },
})

export const DetailSectionAction = styled("button", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 12px",
    borderRadius: "{radii.md}",
    border: "1px solid {colors.border}",
    background: "{colors.background}",
    color: "{colors.foreground}",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "{fonts.nativeFont}",
    transition: "all 150ms ease",
    "&:hover": {
      background: "{colors.elevated}",
      borderColor: "{colors.border}",
    },
  },
})

/* --------------------------------- Subtasks --------------------------------- */

export const SubtaskCard = styled("div", {
  base: {
    border: "1px solid {colors.border}",
    borderRadius: "{radii.lg}",
    padding: "14px",
    background: "{colors.background}",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    position: "relative",
    overflow: "hidden",
  },
})

export const SubtaskCardBorder = styled("div", {
  base: {
    position: "absolute",
    left: "0",
    top: "0",
    bottom: "0",
    width: "3px",
    background: "color-mix(in srgb, {colors.primary} 12%, transparent)",
    borderRadius: "{radii.lg} 0 0 {radii.lg}",
  },
})

export const SubtaskCardHeader = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "{spacing.s12}",
  },
})

export const SubtaskCardTitle = styled("h4", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const SubtaskCardActions = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.xs}",
  },
})

export const SubtaskCardContent = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
})

/* --------------------------------- Comments --------------------------------- */

export const CommentInputWrapper = styled("div", {
  base: {
    border: "1px solid {colors.border}",
    borderRadius: "{radii.lg}",
    padding: "10px 12px",
    background: "{colors.background}",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
  },
})

export const CommentInput = styled("textarea", {
  base: {
    width: "100%",
    border: "none",
    background: "transparent",
    resize: "none",
    fontSize: "{fontSizes.body-sm}",
    lineHeight: "1.5",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    minHeight: "18px",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: "{colors.textMuted}",
    },
  },
})

export const CommentInputActions = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "{spacing.sm}",
  },
})

export const CommentInputIconButton = styled("button", {
  base: {
    width: "28px",
    height: "28px",
    borderRadius: "{radii.md}",
    border: "none",
    background: "transparent",
    color: "{colors.textMuted}",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 150ms ease",
    "&:hover": {
      background: "{colors.elevated}",
      color: "{colors.foreground}",
    },
  },
})

export const CommentList = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.md}",
  },
})

export const CommentItem = styled("div", {
  base: {
    display: "flex",
    gap: "10px",
  },
})

export const CommentAvatar = styled("div", {
  base: {
    width: "28px",
    height: "28px",
    borderRadius: "{radii.full}",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "{fontSizes.label-md}",
    fontWeight: "700",
    color: "{colors.background}",
    flexShrink: "0",
    background: "{colors.primary}",
  },
})

export const CommentContent = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
    minWidth: "0",
    flex: "1",
  },
})

export const CommentHeader = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
})

export const CommentAuthorGroup = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    minWidth: "0",
  },
})

export const CommentAuthor = styled("span", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const CommentDate = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    color: "{colors.textMuted}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const CommentText = styled("p", {
  base: {
    margin: "0",
    fontSize: "{fontSizes.body-sm}",
    lineHeight: "1.5",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const CommentReplyButton = styled("button", {
  base: {
    background: "none",
    border: "none",
    padding: "0",
    margin: "0",
    fontSize: "{fontSizes.label-md}",
    fontWeight: "600",
    color: "{colors.primary}",
    cursor: "pointer",
    fontFamily: "{fonts.nativeFont}",
    display: "inline-flex",
    alignItems: "center",
    gap: "{spacing.xs}",
    "&:hover": {
      textDecoration: "underline",
    },
  },
})
