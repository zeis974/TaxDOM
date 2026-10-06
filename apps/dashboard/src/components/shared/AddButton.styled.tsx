import { styled } from "@/panda/jsx"

/**
 * Bouton « Ajouter » unique pour toutes les pages (action primaire).
 */
export const AddButton = styled("button", {
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
    "&:hover": {
      borderColor: "{colors.foreground}",
    },
    "&:focus-visible": {
      outline: "2px solid {colors.border}",
      outlineOffset: "2px",
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
})
