import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "18px",
    width: "100%",
    height: "inherit",
    padding: "0 {spacing.s20}",
    margin: "0 auto",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const Header = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    "& > span": {
      fontSize: "0.8rem",
      fontWeight: "600",
      opacity: "0.6",
    },
    "& h2": {
      fontSize: "1.4rem",
      fontWeight: "700",
    },
    "& p": {
      fontSize: "0.9rem",
      opacity: "0.8",
    },
  },
})

export const List = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxHeight: "360px",
    overflowY: "auto",
  },
})

export const Card = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "{spacing.s12}",
    textAlign: "left",
    padding: "12px 14px",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.lg}",
    background: "{colors.background}",
    cursor: "pointer",
    transition: "border-color 0.15s ease",
    "& > strong": {
      fontSize: "0.98rem",
      fontWeight: "600",
      color: "{colors.foreground}",
    },
    "&:hover": {
      borderColor: "color-mix(in srgb, {colors.primary} 12%, transparent)",
    },
  },
})

export const Rates = styled("div", {
  base: {
    display: "flex",
    gap: "10px",
  },
})

export const Rate = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > span:first-child": {
      fontSize: "0.95rem",
      fontWeight: "700",
      color: "{colors.primary}",
    },
    "& > span:last-child": {
      fontSize: "0.68rem",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      opacity: "0.6",
    },
  },
})

export const ResetButton = styled("button", {
  base: {
    alignSelf: "flex-start",
    padding: "9px 14px",
    fontSize: "0.85rem",
    fontWeight: "500",
    color: "{colors.foreground}",
    background: "transparent",
    border: "1px solid {colors.border}",
    borderRadius: "{radii.md}",
    cursor: "pointer",
    "&:hover": {
      background: "{colors.background}",
    },
  },
})
