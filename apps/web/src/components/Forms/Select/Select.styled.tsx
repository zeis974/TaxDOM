import { styled } from "@/panda/jsx"

export const LoadingCircle = styled("div", {
  base: {
    position: "absolute",
    right: "9px",
    bottom: "8px",
    border: "2px solid {colors.primary}",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    animation: "rotate 1s linear infinite",
    opacity: "1",
    transition: "opacity 250ms",
  },
})

export const OptionContainer = styled("ul", {
  base: {
    width: "100%",
    borderRadius: "{radii.sm}",
    top: "calc(100% + 5px)",
    zIndex: "1",
    position: "absolute",
    border: "2px solid {colors.border}",
    background: "{colors.elevated}",
    '& > li[data-selected="true"], & > div > li[data-selected="true"]': {
      background: "{colors.infoBg}",
      color: "{colors.infoFg}",
    },
    "& > li, & > div > li": {
      cursor: "pointer",
      display: "block",
      transition: "background 150ms",
      boxSizing: "border-box",
      '&[data-available="false"]': {
        opacity: "0.5",
      },
    },
    "& > div > li": {
      position: "absolute",
      padding: "5px",
    },
    '& > li:not([style*="position: absolute"])': {
      position: "relative",
      padding: "5px",
    },
  },
})

export const VirtualizerContainer = styled("div", {
  base: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
})

export const VirtualItem = styled("li", {
  base: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  },
})

export const NonVirtualItem = styled("li", {
  base: {
    height: "35px",
    display: "flex",
    alignItems: "center",
    padding: "0 5px",
  },
})

export const OptionContent = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    height: "100%",
    minWidth: "0",
    "& > span": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    "& .fi-fis": {
      flexShrink: "0",
    },
  },
})
