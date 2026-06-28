import { styled } from "@/panda/jsx"

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px;
  text-align: center;
  font-family: token(fonts.nativeFont);
`

export const ErrorTitle = styled.h1`
  font-size: token(fontSizes.headline-lg);
  margin-bottom: 8px;
  color: token(colors.errorFg);
`

export const ErrorMessage = styled.p`
  color: token(colors.textMuted);
  margin-bottom: 24px;
`

export const RetryButton = styled.button`
  padding: 10px 24px;
  background: token(colors.foreground);
  color: token(colors.background);
  border: none;
  border-radius: token(radii.md);
  cursor: pointer;
  font-size: token(fontSizes.body-sm);
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`
