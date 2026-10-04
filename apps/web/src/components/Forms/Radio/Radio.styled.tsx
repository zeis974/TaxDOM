import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    fontFamily: "{fonts.nativeFont}",
    display: "flex",
    marginBottom: "10px",
    "& > div:first-of-type": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "& > div": {
        display: "inline-flex",
        overflow: "hidden",
        width: "fit-content",
        padding: "2px",
        height: "40px",
        border: "2px solid {colors.border}",
        borderRadius: "{radii.sm}",
        "& > div": {
          display: "inherit",
          width: "50%",
          height: "100%",
          "&:first-of-type": {
            borderRadius: "{radii.sm} 0 0 {radii.sm}",
            borderRight: "none",
          },
          "&:last-of-type": {
            borderRadius: "0 {radii.sm} {radii.sm} 0",
            borderLeft: "none",
          },
          "& > input": {
            display: "none",
            "&:checked + label": {
              transition: "background 250ms",
              background: "{colors.textMuted}",
              borderRadius: "2px",
            },
            "&[disabled] + label": {
              cursor: "not-allowed",
              opacity: "0.5",
            },
          },
          "& label": {
            width: "100%",
            padding: "5px",
            userSelect: "none",
            textTransform: "capitalize",
            cursor: "pointer",
          },
        },
      },
      "& > span": {
        display: "block",
        marginBottom: "5px",
        fontWeight: "600",
      },
    },
  },
})
