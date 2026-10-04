import { styled } from "@/panda/jsx"

export const Section = styled("section", {
  base: {
    display: "flex",
    height: "calc(100svh - 10px)",
    overflow: "hidden",
  },
})

export const Content = styled("div", {
  base: {
    flex: "2",
    margin: "0 10px",
    overflowY: "auto",
  },
})
