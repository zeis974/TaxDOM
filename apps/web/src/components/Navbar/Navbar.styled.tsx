import { styled } from "@/panda/jsx"

export const Nav = styled("nav", {
  base: {
    position: "relative",
    zIndex: "3",
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: "0 30px",
    height: "{sizes.navbarHeight}",
    background: "{colors.background}",
  },
})

export const Brand = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    "& > a": {
      color: "{colors.primary}",
      fontSize: "clamp(1.4em, 5vw, 2em)",
      fontFamily: "{fonts.rowdies}",
      borderRadius: "{radii.sm}",
      "&:focus-visible": {
        outline: "2px solid {colors.primary}",
        outlineOffset: "2px",
      },
    },
  },
})

export const Actions = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
})
