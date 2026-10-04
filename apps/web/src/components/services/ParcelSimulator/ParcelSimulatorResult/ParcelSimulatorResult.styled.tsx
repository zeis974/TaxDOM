import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "15px",
    background: "{colors.elevated}",
    color: "{colors.foreground}",
    position: "absolute",
    padding: "{spacing.s20}",
    width: "100%",
    height: "100%",
    borderRadius: "{radii.lg}",
    zIndex: "1",
    "& hr": {
      margin: "0 {spacing.s20}",
    },
  },
})

export const ProductsContainer = styled("div", {
  base: {
    position: "relative",
    gridArea: "2 / 1 / 3 / 2",
    background: "{colors.background}",
    color: "{colors.foreground}",
    borderRadius: "{radii.lg}",
    overflowY: "auto",
    "& > div:first-of-type": {
      display: "flex",
      padding: "10px 0",
      margin: "0 10px",
      justifyContent: "space-between",
      alignItems: "center",
      background: "{colors.background}",
      color: "{colors.foreground}",
      position: "sticky",
      top: "0",
      "&::after": {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "10px",
        background: "linear-gradient(0deg, transparent 0%, {colors.background} 100%)",
        top: "100%",
      },
      "& span:last-child": {
        margin: "0 10px",
      },
    },
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "{colors.elevated}",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "{colors.border}",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "{colors.textMuted}",
    },
  },
})

export const ProductCard = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    background: "{colors.elevated}",
    padding: "10px",
    margin: "10px",
    borderRadius: "{radii.sm}",
    border: "1px solid {colors.border}",
  },
})

export const TaxesContainer = styled("div", {
  base: {
    gridArea: "2 / 2 / 3 / 3",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    color: "{colors.foreground}",
  },
})

export const TaxesInfo = styled("div", {
  base: {
    background: "{colors.background}",
    borderRadius: "{radii.lg}",
    padding: "10px",
    "& > div": {
      display: "flex",
      margin: "{spacing.s20} 0",
      justifyContent: "space-around",
      "& div": {
        display: "inherit",
        flexDirection: "column",
        "& p": {
          "& span": {
            font: "bold 1.5em {fonts.nativeFont}",
            color: "{colors.primaryHover}",
            marginRight: "5px",
          },
        },
      },
    },
  },
})

export const DutyInfo = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    margin: "{spacing.s20} 0",
    "& span": {
      marginBottom: "10px",
      color: "{colors.foreground}",
      "& span": {
        color: "{colors.primaryHover}",
        font: "bold 1.5em {fonts.nativeFont}",
      },
    },
    "& p": {
      position: "relative",
      fontSize: "0.8em",
      textAlign: "justify",
      marginLeft: "10px",
      "&::before": {
        content: '""',
        position: "absolute",
        height: "100%",
        width: "2px",
        left: "-10px",
        background: "{colors.elevated}",
      },
    },
  },
})

export const Informations = styled("div", {
  base: {
    gridArea: "1 / 1 / 2 / 3",
    background: "{colors.background}",
    borderRadius: "{radii.lg}",
    overflowY: "auto",
  },
})

export const TaxesInformations = styled("div", {
  base: {
    padding: "10px",
    '&[data-taxes="false"] h1': {
      color: "{colors.successFg}",
    },
    "& h1": {
      color: "{colors.errorFg}",
    },
    "& hr": {
      margin: "15px 0",
    },
    "& h3": {
      marginBottom: "15px",
      "& ~ div": {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        "&::before": {
          content: '""',
          position: "absolute",
          height: "100%",
          width: "2px",
          background: "{colors.elevated}",
        },
        "& p": {
          position: "relative",
          fontSize: "1em",
          // text-align: justify;
          marginLeft: "10px",
          "& span": {
            color: "{colors.primaryHover}",
            font: "bold 1em {fonts.nativeFont}",
          },
        },
      },
    },
  },
})
