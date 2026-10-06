import { styled } from "@/panda/jsx"

export const CaptchaContainer = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
  },
})

export const InputWrapper = styled("div", {
  base: {
    position: "relative",
  },
})

export const ConvertButton = styled("button", {
  base: {
    position: "absolute",
    right: "6px",
    bottom: "6px",
    padding: "3px 10px",
    fontSize: "0.75rem",
    fontWeight: "600",
    fontFamily: "{fonts.nativeFont}",
    color: "{colors.infoFg}",
    background: "{colors.infoBg}",
    border: "none",
    borderRadius: "{radii.sm}",
    cursor: "pointer",
    transition: "opacity 0.15s ease",
    "&:hover": {
      opacity: "0.85",
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
})
