import { styled } from "@/panda/jsx"

export const Nav = styled("nav", {
  base: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 30px",
    height: "{sizes.navbarHeight}",
    "& > div:first-of-type": {
      display: "flex",
      position: "relative",
      "& > a": {
        color: "{colors.primary}",
        fontSize: "clamp(1.4em, 5vw, 2em)",
        fontFamily: "{fonts.rowdies}",
        position: "relative",
      },
    },
    "& > div:last-of-type": {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.s20}",
    },
  },
})
