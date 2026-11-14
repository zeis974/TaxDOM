import { styled } from "@/panda/jsx"

export const TabBar = styled("nav", {
  base: {
    display: "none",
    _touch: {
      position: "fixed",
      zIndex: "2",
      insetInline: "{spacing.md}",
      bottom: "{spacing.md}",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      maxWidth: "calc({spacing.xl} * 15)",
      marginInline: "auto",
      padding: "{spacing.xs}",
      // Not `elevated`: page content sits on elevated cards
      background: "{colors.background}",
      borderRadius: "{radii.full}",
      boxShadow: "0 16px 32px -16px {colors.shadow}, 0 4px 12px -4px {colors.shadow}",
      fontFamily: "{fonts.nativeFont}",
    },
    "& > [data-indicator]": {
      position: "absolute",
      insetBlock: "{spacing.xs}",
      left: "{spacing.xs}",
      width: "calc((100% - {spacing.xs} * 2) / 4)",
      borderRadius: "{radii.full}",
      // Tabs on it must stay `foreground`, the only text token allowed on a color-mix
      background: "color-mix(in srgb, {colors.foreground} 20%, transparent)",
      "@media (prefers-reduced-motion: no-preference)": {
        transition: "translate 350ms cubic-bezier(0.32, 1.25, 0.5, 1), opacity 150ms",
      },
    },
    '&[data-active-index="-1"] > [data-indicator]': {
      opacity: "0",
    },
    '&[data-active-index="1"] > [data-indicator]': {
      translate: "100% 0",
    },
    '&[data-active-index="2"] > [data-indicator]': {
      translate: "200% 0",
    },
    "& > a, & > button": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "{spacing.xs}",
      padding: "{spacing.sm}",
      border: "none",
      borderRadius: "{radii.full}",
      background: "none",
      color: "{colors.foreground}",
      font: "inherit",
      fontSize: "{fontSizes.label-md}",
      fontWeight: "600",
      textDecoration: "none",
      cursor: "pointer",
      "@media (prefers-reduced-motion: no-preference)": {
        transition: "scale 150ms",
        "&:active": {
          scale: "0.92",
        },
      },
      "&:focus-visible": {
        outline: "2px solid {colors.primary}",
        outlineOffset: "-2px",
      },
    },
  },
})

export const Sheet = styled("dialog", {
  base: {
    inset: "auto 0 0",
    width: "100%",
    maxWidth: "calc({spacing.xl} * 20)",
    maxHeight: "85dvh",
    margin: "0 auto",
    padding: "0",
    overflowY: "auto",
    overscrollBehavior: "contain",
    border: "none",
    borderRadius: "{radii.lg} {radii.lg} 0 0",
    background: "{colors.background}",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    translate: "0 100%",
    "&[open]": {
      translate: "0",
    },
    "&::backdrop": {
      background: "{colors.overlay}",
      opacity: "0",
    },
    "&[open]::backdrop": {
      opacity: "1",
    },
    // Enter and exit slide; browsers without allow-discrete just skip the exit
    "@media (prefers-reduced-motion: no-preference)": {
      transition:
        "translate 250ms ease-out, display 250ms allow-discrete, overlay 250ms allow-discrete",
      "&::backdrop": {
        transition: "opacity 250ms, display 250ms allow-discrete, overlay 250ms allow-discrete",
      },
      "@starting-style": {
        "&[open]": {
          translate: "0 100%",
        },
        "&[open]::backdrop": {
          opacity: "0",
        },
      },
    },
  },
})

export const SheetBody = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.md}",
    padding: "{spacing.md}",
    paddingBottom: "{spacing.lg}",
  },
})

export const SheetHeader = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export const SheetTitle = styled("h2", {
  base: {
    fontSize: "{fontSizes.headline-md}",
    fontWeight: "700",
  },
})

export const CloseButton = styled("button", {
  base: {
    display: "grid",
    placeItems: "center",
    width: "calc({spacing.xl} + {spacing.sm})",
    height: "calc({spacing.xl} + {spacing.sm})",
    border: "none",
    borderRadius: "{radii.full}",
    background: "{colors.elevated}",
    color: "{colors.foreground}",
    cursor: "pointer",
    "&:focus-visible": {
      outline: "2px solid {colors.primary}",
      outlineOffset: "2px",
    },
  },
})

export const TileGrid = styled("ul", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "{spacing.sm}",
    listStyle: "none",
  },
})

export const Tile = styled("li", {
  base: {
    "& > a, & > button": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "{spacing.sm}",
      width: "100%",
      height: "100%",
      padding: "{spacing.md} {spacing.sm}",
      border: "none",
      borderRadius: "{radii.lg}",
      background: "none",
      color: "{colors.foreground}",
      font: "inherit",
      fontSize: "{fontSizes.body-sm}",
      fontWeight: "600",
      textDecoration: "none",
      cursor: "pointer",
      transition: "background 150ms",
      "& svg": {
        width: "{sizes.toolIcon}",
        height: "{sizes.toolIcon}",
      },
      "&:active": {
        background: "{colors.elevated}",
      },
      "&:focus-visible": {
        outline: "2px solid {colors.primary}",
        outlineOffset: "-2px",
      },
    },
    // Upcoming tools
    "& > button": {
      cursor: "default",
      color: "{colors.textMuted}",
      "& > svg": {
        filter: "grayscale(1)",
        opacity: "0.5",
      },
      "&:active": {
        background: "none",
      },
    },
  },
})

export const Badge = styled("span", {
  base: {
    padding: "0 {spacing.sm}",
    borderRadius: "{radii.full}",
    background: "{colors.infoBg}",
    color: "{colors.infoFg}",
    fontSize: "{fontSizes.label-md}",
  },
})
