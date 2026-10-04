import { styled } from "@/panda/jsx"

export const ActionBar = styled("div", {
  base: {
    display: "flex",
    gap: "10px",
    height: "40px",
    marginTop: "25px",
    "& div": {
      width: "40px",
      height: "35px",
      display: "inherit",
      alignItems: "center",
      justifyContent: "center",
      padding: "6px",
      borderRadius: "{radii.sm}",
      cursor: "pointer",
      background: "{colors.foreground}",
      transition: "background 150ms",
    },
  },
})

export const Container = styled("div", {
  base: {
    display: "flex",
    overflow: "hidden",
    background: "{colors.primary}",
    padding: "25px 0 0 25px",
    borderRadius: "{radii.lg}",
  },
})

export const Content = styled("div", {
  base: {
    // Sits on the primary-filled Container: the readable pairing is the background token — foreground fails contrast in both modes.
    color: "{colors.background}",
    textAlign: "left",
    marginBottom: "25px",
    "& span:first-child": {
      fontFamily: "{fonts.rowdies}",
      fontSize: "clamp(14px, 1.5vw, 16px)",
      color: "{colors.background}",
      padding: "5px",
      borderRadius: "{radii.sm}",
      background: "{colors.primaryHover}",
    },
    "& h1": {
      fontFamily: "{fonts.nativeFont}",
      fontSize: "clamp(16px, 1.5vw, 24px)",
      color: "{colors.background}",
      lineHeight: "1.2",
      margin: "{spacing.s20} 0",
      textAlign: "left",
      "& span": {
        fontFamily: "{fonts.nativeFont}",
      },
    },
    "& p": {
      maxWidth: "250px",
    },
  },
})

export const ErrorContainer = styled("div", {
  base: {
    "& p": {
      maxWidth: "500px",
    },
  },
})

export const ErrorText = styled("span", {
  base: {
    position: "absolute",
    width: "100%",
    fontSize: "0.6em",
    padding: "10px",
    color: "{colors.errorFg}",
    bottom: "0",
    right: "0",
    cursor: "pointer",
  },
})

export const Line = styled("hr", {
  base: {
    position: "relative",
    border: "2px solid {colors.primaryHover}",
  },
})

export const PriceCalculator = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    padding: "10px 10px 0",
    color: "{colors.foreground}",
    "& h5": {
      fontFamily: "{fonts.nativeFont}",
      textAlign: "left",
    },
    "& > div": {
      display: "inherit",
      marginTop: "10px",
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: "0",
    },
    '& input[type="number"]': {
      maxWidth: "100px",
      background: "none",
      color: "{colors.foreground}",
      outline: "none",
      border: "2px solid {colors.primary}",
      borderRadius: "10px",
      padding: "10px",
      textAlign: "center",
      appearance: "textfield",
    },
  },
})

export const RateCard = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    color: "{colors.foreground}",
    flex: "1",
    "& > span:first-of-type": {
      fontSize: "1.2em",
      color: "{colors.primaryHover}",
      fontWeight: "bold",
    },
    "& > span:last-of-type": {
      fontSize: "0.9em",
    },
  },
})

export const RateContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "110px",
      height: "50px",
      background:
        'no-repeat url("data:image/svg+xml,%3Csvg%20width%3D%22130%22%20height%3D%2238%22%20viewBox%3D%220%200%20130%2038%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M130%200H0C0%200%2010.5012%2038%2029.1775%2038H130V0Z%22%20fill%3D%22%232980B9%22%2F%3E%3C%2Fsvg%3E")',
      top: "-2px",
      right: "0",
    },
    "&::after": {
      content: 'attr(data-total) "% total"',
      color: "{colors.background}",
      position: "absolute",
      fontWeight: "bold",
      top: "0",
      right: "-9px",
      width: "100px",
      padding: "5px 0 5px 5px",
    },
    "& div": {
      display: "inherit",
      margin: "10px 0",
    },
    "& h5": {
      fontFamily: "{fonts.nativeFont}",
      padding: "10px",
    },
  },
})

export const ResetButton = styled("button", {
  base: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "{colors.background}",
    border: "2px solid {colors.primaryHover}",
    borderRadius: "{radii.sm}",
    cursor: "pointer",
    fontWeight: "bold",
    color: "{colors.primaryHover}",
    transition: "150ms",
    "&:hover": {
      background: "{colors.primaryHover}",
      color: "{colors.background}",
    },
  },
})

export const TaxeCard = styled("div", {
  base: {
    position: "relative",
    width: "250px",
    height: "100%",
    color: "{colors.foreground}",
    zIndex: "1",
    "&::before": {
      content: '""',
      position: "absolute",
      zIndex: "-1",
      borderRadius: "{radii.lg}",
      background: "{colors.background}",
      width: "calc(100% + 35px)",
      height: "calc(100% + 35px)",
      inset: "0",
    },
    "@media screen and (width < 1250px)": {
      width: "200px",
    },
  },
})
