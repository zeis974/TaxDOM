import { styled } from "@/panda/jsx"

export const Layout = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "{spacing.md}",
    minHeight: "100dvh",
    padding: "{spacing.md}",
    background: "{colors.background}",
    "@media (width < 900px)": {
      gridTemplateColumns: "1fr",
      background:
        "linear-gradient(180deg, color-mix(in srgb, {colors.primary} 22%, {colors.background}) 0%, {colors.background} 70%)",
    },
  },
})

export const FormPanel = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    padding: "{spacing.s12} {spacing.lg}",
    justifyContent: "center",
  },
})

export const BrandName = styled("h1", {
  base: {
    margin: "0",
    textAlign: "center",
    fontSize: "clamp(2rem, 1.75rem + 0.75vw, 2.5rem)",
    fontFamily: "{fonts.rowdies}",
    color: "{colors.foreground}",
    letterSpacing: "tight",
  },
})

export const Main = styled("main", {
  base: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "{spacing.xl}",
    width: "100%",
    maxWidth: "360px",
    margin: "0 auto",
    paddingBottom: "{spacing.xl}",
  },
})

export const Button = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "{spacing.s12}",
    width: "100%",
    padding: "{spacing.s12} {spacing.md}",
    background: "color-mix(in srgb, {colors.foreground} 14%, transparent)",
    border: "1px solid transparent",
    borderRadius: "{radii.md}",
    fontFamily: "{fonts.nativeFont}",
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "600",
    color: "{colors.foreground}",
    cursor: "pointer",
    transition: "all 150ms ease",
    "&:hover:not(:disabled)": {
      background: "color-mix(in srgb, {colors.foreground} 22%, transparent)",
    },
    "&:disabled": {
      opacity: "0.6",
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.primary}",
      outlineOffset: "2px",
    },
  },
})

export const Icon = styled("svg", {
  base: {
    width: "20px",
    height: "20px",
    flexShrink: "0",
  },
})

export const ShowcasePanel = styled("aside", {
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "{spacing.xl}",
    borderRadius: "{radii.lg}",
    overflow: "hidden",
    background:
      "radial-gradient(circle at 50% 50%, color-mix(in srgb, {colors.primary} 16%, {colors.background}) 0%, color-mix(in srgb, {colors.primary} 8%, {colors.background}) 70%)",
    "@media (width < 900px)": {
      display: "none",
    },
  },
})

export const DOT_SPACING = 10

// The resting grid is a CSS background; the canvas only draws lit dots on top of it.
// `color` carries the lit dot color: the canvas reads it back, so it follows the theme.
export const DotCanvas = styled("canvas", {
  base: {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    color: "{colors.primary}",
    backgroundImage:
      "radial-gradient(circle, color-mix(in srgb, {colors.primary} 16%, transparent) 0.8px, transparent 1.2px)",
    // Literal on purpose: Panda extracts styles statically. Keep in sync with DOT_SPACING.
    backgroundSize: "10px 10px",
    backgroundPosition: "center",
    pointerEvents: "none",
    maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 55%, transparent 100%)",
  },
})

export const Orbit = styled("div", {
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "min(80%, 480px, 60dvh)",
    aspectRatio: "1",
  },
})

export const Ring = styled("div", {
  base: {
    position: "absolute",
    borderRadius: "{radii.full}",
    border: "1px solid color-mix(in srgb, {colors.primary} 30%, transparent)",
    animation: "popIn 800ms ease-out both, rotate 90s linear infinite",
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
  variants: {
    // Rings grow outward from the core, one after another.
    position: {
      inner: { animationDelay: "100ms, 0s" },
      outer: { animationDelay: "250ms, 0s" },
    },
    reverse: {
      true: { animationDirection: "normal, reverse" },
    },
  },
})

export const Chip = styled("div", {
  base: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    marginTop: "-32px",
    marginLeft: "-32px",
    borderRadius: "{radii.full}",
    background: "{colors.background}",
    color: "{colors.foreground}",
    animation: "popIn 400ms ease-out both, rotate 90s linear infinite reverse",
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
  variants: {
    // Chips on a reversed ring counter-spin forward to stay upright.
    reverse: {
      true: { animationDirection: "normal, normal" },
    },
  },
})

export const ChipImage = styled("img", {
  base: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
    pointerEvents: "none",
    userSelect: "none",
  },
})

export const Core = styled("img", {
  base: {
    position: "relative",
    width: "88px",
    height: "88px",
    borderRadius: "{radii.full}",
    objectFit: "cover",
    pointerEvents: "none",
    userSelect: "none",
    boxShadow:
      "0 0 0 10px color-mix(in srgb, {colors.primary} 16%, transparent), 0 0 0 22px color-mix(in srgb, {colors.primary} 7%, transparent), 0 0 72px 12px color-mix(in srgb, {colors.primary} 45%, transparent)",
    animation: "popIn 500ms ease-out both",
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
})
