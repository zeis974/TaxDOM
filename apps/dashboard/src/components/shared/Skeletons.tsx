import { styled } from "@/panda/jsx"

export const DELAYED_FADE = "fadeIn 0.2s ease-out 180ms both"

export const SkeletonRect = styled("span", {
  base: {
    display: "block",
    borderRadius: "{radii.sm}",
    background:
      "linear-gradient( 90deg, {colors.elevated} 25%, {colors.border} 50%, {colors.elevated} 75% )",
    backgroundSize: "200% 100%",
    animation: "skeleton-shimmer 1.6s ease-in-out infinite",
  },
})
