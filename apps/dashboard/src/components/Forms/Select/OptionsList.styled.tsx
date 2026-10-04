import { styled } from "@/panda/jsx"

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
