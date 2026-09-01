import { styled } from "@/panda/jsx"

export const LoadingFallbackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  padding: token(spacing.lg);
  font-size: token(fontSizes.sm);
  color: token(colors.foreground.muted);
`
