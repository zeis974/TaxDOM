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
      background: "#f0f0f0",
    },
    "50%": {
      background: "#e0e0e0",
    },
    "100%": {
      background: "#f0f0f0",
    },
  },
})
