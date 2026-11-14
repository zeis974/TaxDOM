import { styled } from "@/panda/jsx"

// Sets the color the tool tiles fill with, matching the accent of the tool preview
export const ToolAccent = styled("span", {
  base: {
    display: "contents",
    "--tool-accent": "{colors.primary}",
    color: "var(--tool-accent)",
    '&[data-variant="orange"]': { "--tool-accent": "{colors.accentOrange}" },
    '&[data-variant="violet"]': { "--tool-accent": "{colors.accentViolet}" },
    '&[data-variant="green"]': { "--tool-accent": "{colors.accentGreen}" },
    '&[data-variant="cyan"]': { "--tool-accent": "{colors.accentCyan}" },
    '&[data-variant="pink"]': { "--tool-accent": "{colors.accentPink}" },
    // Dark-mode accents are too light under the white glyph: darkened, every tile keeps 3.6:1
    _dark: {
      color: "color-mix(in srgb, var(--tool-accent) 70%, black)",
    },
  },
})
