import { styled } from "@/panda/jsx"

export const FilterWrapper = styled("div", {
  base: {
    position: "relative",
    display: "inline-flex",
  },
})

export const FilterTrigger = styled("button", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "{spacing.sm}",
    padding: "10px 16px",
    background: "{colors.elevated}",
    fontWeight: "600",
    border: "1px solid {colors.border}",
    cursor: "pointer",
    borderRadius: "{radii.md}",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    fontSize: "{fontSizes.body-sm}",
    transition: "all 150ms ease",
    '&[data-active="true"]': {
      borderColor: "{colors.primary}",
      color: "{colors.primary}",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.primary}",
      outlineOffset: "2px",
    },
  },
})

export const FilterDot = styled("span", {
  base: {
    width: "{spacing.sm}",
    height: "{spacing.sm}",
    borderRadius: "{radii.full}",
    background: "{colors.primary}",
    flexShrink: "0",
  },
})

export const FilterPopover = styled("div", {
  base: {
    position: "absolute",
    top: "calc(100% + {spacing.sm})",
    right: "0",
    zIndex: "20",
    minWidth: "220px",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.md}",
    padding: "{spacing.md}",
    background: "{colors.elevated}",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.md}",
    boxShadow: "0 8px 20px {colors.shadow}",
    animation: "fadeIn 150ms ease-out",
  },
})

export const FilterSection = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
  },
})

export const FilterSectionLabel = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "{colors.textMuted}",
  },
})

export const FilterOptions = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    gap: "{spacing.xs}",
  },
})

export const FilterOption = styled("button", {
  base: {
    padding: "{spacing.xs} {spacing.sm}",
    background: "transparent",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.sm}",
    cursor: "pointer",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    fontSize: "{fontSizes.body-sm}",
    transition: "all 150ms ease",
    "&:hover": {
      borderColor: "{colors.primary}",
    },
    '&[data-active="true"]': {
      background: "color-mix(in srgb, {colors.primary} 12%, transparent)",
      borderColor: "{colors.primary}",
      color: "{colors.primary}",
      fontWeight: "600",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.primary}",
      outlineOffset: "2px",
    },
  },
})
