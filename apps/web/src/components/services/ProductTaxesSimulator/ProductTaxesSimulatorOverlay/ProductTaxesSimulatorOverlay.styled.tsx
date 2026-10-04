import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Container = styled(m.div, {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "0 {spacing.s20}",
    fontFamily: "{fonts.nativeFont}",
    flexDirection: "column",
    height: "inherit",
    "& > div": {
      position: "relative",
      "& p": {
        margin: "10px 0",
      },
      "& p:last-child": {
        margin: "{spacing.s20} 0",
      },
    },
  },
})

export const Underline = styled("span", {
  base: {
    textDecoration: "underline dotted",
    textUnderlineOffset: "3px",
    cursor: "pointer",
  },
})
export const Wrapper = styled("div", {
  base: {
    maxWidth: "85%",
    margin: "0 auto",
    "& > p": {
      maxWidth: "600px",
    },
  },
})
