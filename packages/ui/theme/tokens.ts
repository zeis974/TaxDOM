import { defineTokens } from "@pandacss/dev"

export const tokens = defineTokens({
  fonts: {
    nativeFont: {
      value:
        '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    rowdies: {
      value: "var(--rowdies), serif",
    },
  },
  fontSizes: {
    "headline-lg": { value: "1.5rem" },   // 24px
    "headline-md": { value: "1.125rem" }, // 18px
    "body-md": { value: "1rem" },         // 16px
    "body-sm": { value: "0.875rem" },     // 14px
    "label-md": { value: "0.75rem" },     // 12px
  },
  sizes: {
    navbarHeight: { value: "95px" },
    maxWidth: { value: "2400px" },
  },
  radii: {
    sm: { value: "4px" },
    md: { value: "8px" },
    lg: { value: "12px" },
    full: { value: "9999px" },
  },
  spacing: {
    s2: { value: "2px" },
    xs: { value: "4px" },
    sm: { value: "8px" },
    s10: { value: "10px" },
    s12: { value: "12px" },
    s14: { value: "14px" },
    md: { value: "16px" },
    s20: { value: "20px" },
    lg: { value: "24px" },
    xl: { value: "32px" },
  },
})
