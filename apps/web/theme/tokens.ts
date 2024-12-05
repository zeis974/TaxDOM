import { defineTokens } from "@pandacss/dev"

export const tokens = defineTokens({
  breakpoints: {
    mobile: { value: "768px" },
  },
  fonts: {
    nativeFont: {
      value:
        '--apple-system, system-ui, BlinkMacSystemFont,"Segoe UI",Roboto, "Helvetica Neue", Arial, sans-serif;',
    },
    Rowdies: {
      value: "var(--rowdies), serif",
    },
    NotoSans: {
      value: "var(--noto-sans), sans-serif",
    },
    NotoSansBold: {
      value: "var(--noto-sans-bold), sans-serif",
    },
  },
  sizes: {
    navbarHeight: { value: "95px" },
    maxWidth: { value: "2400px" },
  },
})
