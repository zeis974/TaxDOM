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
    display: { value: "2rem" },           // 32px
    "headline-lg": { value: "1.5rem" },   // 24px
    "headline-md": { value: "1.125rem" }, // 18px
    "body-md": { value: "1rem" },         // 16px
    "body-sm": { value: "0.875rem" },     // 14px
    "label-md": { value: "0.75rem" },     // 12px
  },
  fontWeights: {
    display: { value: "700" },
    "headline-lg": { value: "700" },
    "headline-md": { value: "600" },
    "body-md": { value: "400" },
    "body-sm": { value: "400" },
    "label-md": { value: "500" },
  },
  lineHeights: {
    display: { value: "1.15" },
    "headline-lg": { value: "1.25" },
    "headline-md": { value: "1.35" },
    "body-md": { value: "1.5" },
    "body-sm": { value: "1.5" },
    "label-md": { value: "1.4" },
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
    xs: { value: "4px" },
    sm: { value: "8px" },
    md: { value: "16px" },
    lg: { value: "24px" },
    xl: { value: "32px" },
  },
})
