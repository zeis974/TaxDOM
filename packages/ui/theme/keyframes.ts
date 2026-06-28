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
  scale: {
    from: {
      transform: "translate(-50%, -50%) scale(0.95)",
    },
    to: {
      transform: "translate(-50%, -50%) scale(1)",
    },
  },
  skeleton: {
    "0%": {
      background: "var(--colors-elevated)",
    },
    "50%": {
      background: "var(--colors-border)",
    },
    "100%": {
      background: "var(--colors-elevated)",
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
  "origins-fade-in": {
    from: {
      opacity: "0",
      transform: "translateY(8px)",
    },
    to: {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  "origins-fade-in-item": {
    from: {
      opacity: "0",
      transform: "translateY(4px)",
    },
    to: {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  "origins-fade-out": {
    from: {
      opacity: "1",
    },
    to: {
      opacity: "0",
    },
  },
  fadeInUp: {
    from: {
      opacity: "0",
      transform: "translateY(20px)",
    },
    to: {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
})
