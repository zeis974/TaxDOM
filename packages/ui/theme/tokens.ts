import { defineTokens } from "@pandacss/dev"

export const tokens = defineTokens({
  fonts: {
    nativeFont: {
      value:
        '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    NotoSans: {
      value:
        '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    NotoSansBold: {
      value:
        '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    Rowdies: {
      value: "var(--rowdies), serif",
    },
  },
  fontSizes: {
    display: { value: "32px" },
    "headline-lg": { value: "24px" },
    "headline-md": { value: "18px" },
    "body-md": { value: "16px" },
    "body-sm": { value: "14px" },
    "label-caps": { value: "11px" },
    "label-md": { value: "12px" },
  },
  fontWeights: {
    display: { value: "400" },
    "headline-lg": { value: "600" },
    "headline-md": { value: "600" },
    "body-md": { value: "400" },
    "body-sm": { value: "400" },
    "label-caps": { value: "600" },
    "label-md": { value: "500" },
  },
  lineHeights: {
    display: { value: "1.2" },
    "headline-lg": { value: "1.3" },
    "headline-md": { value: "1.4" },
    "body-md": { value: "1.6" },
    "body-sm": { value: "1.5" },
    "label-caps": { value: "1" },
    "label-md": { value: "1.4" },
  },
  letterSpacings: {
    "label-caps": { value: "0.08em" },
  },
  sizes: {
    navbarHeight: { value: "95px" },
    maxWidth: { value: "2400px" },
  },
  radii: {
    sm: { value: "4px" },
    md: { value: "8px" },
    panel: { value: "10px" },
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
