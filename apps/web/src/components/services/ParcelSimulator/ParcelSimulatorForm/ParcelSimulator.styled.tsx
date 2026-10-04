import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    display: "flex",
    height: "100%",
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
    "& form": {
      display: "inherit",
      width: "100%",
      gap: "{spacing.s20}",
      "& > div:first-of-type": {
        flex: "1",
        position: "relative",
        height: "100%",
        padding: "{spacing.s20}",
        background: "{colors.elevated}",
        borderRadius: "10px",
        "& #captcha-container": {
          height: "70px",
          marginTop: "{spacing.s20}",
        },
      },
      "& > div:last-child": {
        flex: "2",
      },
    },
  },
})
