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

export const ProductList = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
  },
})

export const ProductItem = styled("div", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "{spacing.s12}",
    background: "{colors.elevated}",
    borderRadius: "6px",
    "& .product-info": {
      display: "flex",
      flexDirection: "column",
      gap: "{spacing.xs}",
      "& h3": {
        fontSize: "0.875em",
        fontWeight: "500",
        margin: "0",
        color: "{colors.foreground}",
      },
      "& .meta": {
        display: "flex",
        alignItems: "center",
        gap: "{spacing.sm}",
        fontSize: "0.75em",
        color: "{colors.textMuted}",
        "& .category": {
          background: "{colors.elevated}",
          padding: "2px 6px",
          borderRadius: "3px",
        },
        "& .separator": {
          opacity: "0.5",
        },
      },
    },
    "& .date": {
      fontSize: "0.75em",
      color: "{colors.textMuted}",
    },
  },
})

export const NoActivity = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "{spacing.xl}",
    color: "{colors.textMuted}",
    fontSize: "0.875em",
  },
})
