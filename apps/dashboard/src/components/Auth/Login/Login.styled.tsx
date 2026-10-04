import { styled } from "@/panda/jsx"

export const Layout = styled("div", {
  base: {
    display: "flex",
    minHeight: "100dvh",
    flexDirection: "row",
  },
})

export const LeftPanel = styled("div", {
  base: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxWidth: "50%",
  },
})

export const RightPanel = styled("div", {
  base: {
    display: "flex",
    flex: "1",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    background: "{colors.primary}",
  },
})

export const Header = styled("header", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0 1rem",
  },
})

export const LogoCircle = styled("div", {
  base: {
    width: "2rem",
    height: "2rem",
    borderRadius: "{radii.full}",
    backgroundColor: "{colors.border}",
    border: "4px solid",
    borderColor: "{colors.elevated}",
  },
})

export const BrandName = styled("span", {
  base: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "{colors.foreground}",
    fontFamily: "{fonts.rowdies}",
    letterSpacing: "tight",
  },
})

export const MainContent = styled("main", {
  base: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
})

export const FormContainer = styled("div", {
  base: {
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
})

export const TitleSection = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
})

export const Title = styled("h1", {
  base: {
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "{colors.foreground}",
    letterSpacing: "tight",
    lineHeight: "1.2",
  },
})

export const Subtitle = styled("p", {
  base: {
    fontSize: "1rem",
    color: "{colors.textMuted}",
  },
})

export const Button = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    width: "100%",
    padding: "0.875rem 1rem",
    backgroundColor: "{colors.background}",
    border: "1px solid",
    borderColor: "{colors.elevated}",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "{colors.foreground}",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 1px 2px 0 {colors.shadow}",
    "&:hover": {
      backgroundColor: "{colors.elevated}",
      borderColor: "{colors.textMuted}",
      boxShadow: "0 4px 6px -1px {colors.shadow}",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow: "0 1px 2px 0 {colors.shadow}",
      backgroundColor: "{colors.elevated}",
    },
    "&:disabled": {
      opacity: "0.6",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },
    "&:focus-visible": {
      outline: "2px solid",
      outlineColor: "{colors.foreground}",
      outlineOffset: "2px",
    },
  },
})

export const Icon = styled("svg", {
  base: {
    width: "1.25rem",
    height: "1.25rem",
  },
})

export const FooterLink = styled("a", {
  base: {
    color: "{colors.foreground}",
    fontWeight: "500",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
})

export const PatternOverlay = styled("div", {
  base: {
    position: "absolute",
    inset: "0",
    opacity: "0.05",
    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
    backgroundSize: "24px 24px",
  },
})

export const RightContent = styled("div", {
  base: {
    position: "relative",
    zIndex: "1",
    maxWidth: "480px",
    textAlign: "left",
  },
})

export const RightTitle = styled("h2", {
  base: {
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "white",
    marginBottom: "1rem",
    lineHeight: "1.3",
  },
})

export const RightSubtitle = styled("p", {
  base: {
    fontSize: "1.125rem",
    lineHeight: "1.6",
  },
})
