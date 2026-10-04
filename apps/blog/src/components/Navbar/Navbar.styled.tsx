import { styled } from "@/panda/jsx"

export const Nav = styled("nav", {
  base: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: "0",
    zIndex: "1",
    padding: "10px 30px",
    height: "95px",
    background: "{colors.background}",
    "& > div:first-of-type": {
      display: "flex",
      position: "relative",
      "& > a": {
        color: "{colors.foreground}",
        fontSize: "clamp(1.8em, 5vw, 2em)",
        fontFamily: "{fonts.rowdies}",
        position: "relative",
      },
    },
    "& > div:last-of-type": {
      display: "flex",
      alignItems: "center",
      gap: "30px",
    },
  },
})

export const ThemeSwitcher = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: "{fonts.nativeFont}",
    '& input[type="checkbox"]': {
      position: "relative",
      width: "50px",
      height: "25px",
      WebkitAppearance: "none",
      appearance: "none",
      background: "{colors.border}",
      outline: "none",
      borderRadius: "25px",
      cursor: "pointer",
      transition: "background 0.3s ease",
      "&:checked": {
        background: "{colors.successFg}",
        "&::before": {
          transform: "translateX(25px)",
        },
      },
      "&::before": {
        content: '""',
        position: "absolute",
        width: "21px",
        height: "21px",
        top: "2px",
        left: "2px",
        background: "{colors.background}",
        borderRadius: "50%",
        transition: "transform 0.3s ease",
      },
    },
  },
})
