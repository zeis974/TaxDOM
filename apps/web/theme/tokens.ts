import { defineTokens } from "@pandacss/dev"

export const tokens = defineTokens({
  fonts: {
    nativeFont: {
      value:
        '--apple-system, system-ui, BlinkMacSystemFont,"Segoe UI",Roboto, "Helvetica Neue", Arial, sans-serif;',
    },
    NotoSans: {
      value: "var(--noto-sans)",
    },
    NotoSansBold: {
      value: "var(--noto-sans-bold)",
    },
  },
  sizes: {
    navbarHeight: { value: "95px" },
    maxWidth: { value: "2400px" },
  },
  colors: {
    bg: { value: "#121212" },
    secondaryBg: { value: "#2a2a2a" },
  },
})
