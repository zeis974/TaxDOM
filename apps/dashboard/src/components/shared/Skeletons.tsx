import { styled } from "@/panda/jsx"

export const DELAYED_FADE = "fadeIn 0.2s ease-out 180ms both"

export const SkeletonRect = styled.span`
  display: block;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    token(colors.elevated) 25%,
    token(colors.border) 50%,
    token(colors.elevated) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
`
