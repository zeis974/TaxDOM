import { styled } from "@/panda/jsx"

export const Card = styled("div", {
  base: {
    background: "{colors.elevated}",
    border: "none",
    borderRadius: "{radii.lg}",
    padding: "14px",
    transition: "all 200ms ease",
    cursor: "default",
    width: "100%",
    textAlign: "left",
  },
})

export const ClickableCard = styled("button", {
  base: {
    background: "{colors.elevated}",
    border: "1px solid transparent",
    borderRadius: "{radii.lg}",
    padding: "14px",
    transition: "all 200ms ease",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    "&:hover": {
      borderColor: "{colors.border}",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.foreground}",
      outlineOffset: "3px",
    },
  },
})

export const CardHeader = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
    gap: "{spacing.md}",
    minWidth: "0",
    "& > *:first-child": {
      flex: "1",
      minWidth: "0",
    },
  },
})

export const CardTitle = styled("h3", {
  base: {
    margin: "0",
    color: "{colors.foreground}",
    fontSize: "{fontSizes.body-md}",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
})

export const CardInfo = styled("span", {
  base: {
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.label-md}",
  },
})

export const BadgeContainer = styled("div", {
  base: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
})

/**
 * Badge décoratif coloré. Variantes via data-type.
 */
export const Badge = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    padding: "4px 10px",
    borderRadius: "{radii.full}",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    '&[data-type="accent"], &[data-type="category"], &[data-type="info"], &[data-type="eu"]': {
      background: "{colors.infoBg}",
      color: "{colors.infoFg}",
    },
    '&[data-type="neutral"], &[data-type="products"]': {
      background: "{colors.elevated}",
      color: "{colors.foreground}",
    },
  },
})

/**
 * Badge de statut actif/inactif. Encodage unique : data-active (booléen).
 */
export const StatusBadgeStyled = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    padding: "{spacing.xs} {spacing.s12}",
    borderRadius: "{radii.full}",
    fontSize: "{fontSizes.label-md}",
    fontWeight: "600",
    letterSpacing: "0.02em",
    '&[data-active="true"]': {
      background: "{colors.successBg}",
      color: "{colors.successFg}",
    },
    '&[data-active="false"]': {
      background: "{colors.errorBg}",
      color: "{colors.errorFg}",
    },
  },
})
