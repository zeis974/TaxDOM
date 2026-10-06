import { styled } from "@/panda/jsx"

export const Section = styled("section", {
  base: {
    display: "flex",
    alignItems: "center",
    width: "calc(100% - 20px)",
    height: "calc(100svh - ({sizes.navbarHeight} + 15px))",
    maxWidth: "{sizes.maxWidth}",
    padding: "25px",
    margin: "0 auto",
    background: "{colors.elevated}",
    borderRadius: "10px",
    "& > form": {
      flex: "1",
      minWidth: "50%",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    "& > form ~ div": {
      flex: "1",
      minWidth: "50%",
    },
  },
})
