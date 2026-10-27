import { defineKeyframes } from "@pandacss/dev"

export const keyframes = defineKeyframes({
  fadeIn: {
    from: {
      opacity: "0",
    },
    to: {
      opacity: "1",
    },
  },
  rotate: {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
  // Token references, not hand-written CSS var names: apps that enable
  // `hash.cssVar` rename the variables, so `var(--colors-elevated)` resolves
  // to nothing there.
  skeleton: {
    "0%": {
      background: "{colors.elevated}",
    },
    "50%": {
      background: "{colors.border}",
    },
    "100%": {
      background: "{colors.elevated}",
    },
  },
  "skeleton-shimmer": {
    "0%": {
      backgroundPosition: "-200% 0",
    },
    "100%": {
      backgroundPosition: "200% 0",
    },
  },
  spin: {
    to: {
      transform: "rotate(360deg)",
    },
  },
  pulse: {
    "0%, 100%": {
      opacity: "1",
    },
    "50%": {
      opacity: "0.4",
    },
  },
  highlightPulse: {
    "0%": {
      background: "color-mix(in srgb, {colors.warningFg} 35%, transparent)",
    },
    "100%": {
      background: "color-mix(in srgb, {colors.warningFg} 12%, transparent)",
    },
  },
})
