import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    background: "{colors.elevated}",
    border: "none",
    borderRadius: "{radii.md}",
    padding: "{spacing.s20}",
  },
})

export const Header = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "{spacing.md}",
    paddingBottom: "{spacing.s12}",
    borderBottom: "1px solid {colors.border}",
    "& h2": {
      fontSize: "1em",
      fontWeight: "600",
      margin: "0",
      color: "{colors.foreground}",
      fontFamily: "{fonts.nativeFont}",
    },
    "& > span": {
      fontSize: "0.813em",
      color: "{colors.textMuted}",
    },
  },
})

export const List = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
  },
})

export const ListItem = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "32px 1fr 80px",
    alignItems: "center",
    gap: "{spacing.s12}",
    padding: "10px 12px",
    background: "{colors.elevated}",
    borderRadius: "6px",
    "& .rank": {
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "{colors.elevated}",
      borderRadius: "{radii.sm}",
      fontWeight: "600",
      fontSize: "0.813em",
      color: "{colors.foreground}",
    },
    "& .info": {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      "& .name": {
        fontSize: "0.875em",
        fontWeight: "500",
        color: "{colors.foreground}",
      },
      "& .count": {
        fontSize: "0.75em",
        color: "{colors.textMuted}",
      },
    },
    "& .value": {
      textAlign: "right",
      fontSize: "0.875em",
      fontWeight: "600",
      color: "{colors.foreground}",
    },
  },
})

export const NoData = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "{spacing.xl}",
    color: "{colors.textMuted}",
    fontSize: "0.875em",
  },
})
