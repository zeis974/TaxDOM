import { styled } from "@/panda/jsx"

export const Container = styled("div", {
  base: {
    color: "{colors.foreground}",
    fontFamily: "{fonts.nativeFont}",
  },
})

export const StatsGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "{spacing.s12}",
    marginBottom: "{spacing.lg}",
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
})

export const ContentGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "{spacing.md}",
    "@media (max-width: 1024px)": {
      gridTemplateColumns: "1fr",
    },
  },
})

export const LeftColumn = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.md}",
  },
})

export const RightColumn = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.md}",
  },
})
