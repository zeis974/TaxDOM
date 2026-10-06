import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    marginLeft: "50px",
    gap: "50px",
    fontFamily: "{fonts.nativeFont}",
    "& > div:first-of-type": {
      position: "relative",
      zIndex: "2",
    },
    "& > a, & span": {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.xs}",
      padding: "10px",
      transition: "background 150ms, color 150ms",
      color: "{colors.foreground}",
      borderRadius: "{radii.sm}",
      "&:hover": {
        background: "{colors.elevated}",
      },
    },
    "& svg": {
      transition: "transform 150ms",
    },
    '& [data-active="true"] > span': {
      color: "{colors.primary}",
    },
    '& [data-active="true"] svg': {
      transform: "rotate(180deg)",
    },
    "@media (width < 768px)": {
      display: "none",
    },
  },
})
