import { styled } from "@/panda/jsx"

export const PendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: token(spacing.sm);
  width: 100%;
  height: 100%;
  min-height: 200px;
  color: token(colors.foreground.muted);
`

export const Spinner = styled.div`
  width: 28px;
  height: 28px;
  border: 3px solid token(colors.border.subtle);
  border-top-color: token(colors.primary);
  border-radius: token(radii.full);
  animation: spin 0.8s linear infinite;
`

export const PendingText = styled.span`
  font-size: token(fontSizes.sm);
  color: token(colors.foreground.muted);
`
