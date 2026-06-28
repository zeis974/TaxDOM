import { styled } from "@/panda/jsx"

export const ErrorContainer = styled.div`
  padding: 20px;
  border: 1px solid token(colors.errorFg);
  border-radius: token(radii.md);
  background-color: token(colors.errorBg);
  color: token(colors.errorFg);
  margin: 16px 0;
`

export const ErrorTitle = styled.h3`
  margin: 0 0 8px;
`

export const ErrorMessage = styled.p`
  margin: 0 0 12px;
`

export const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: token(colors.errorFg);
  color: token(colors.background);
  border: none;
  border-radius: token(radii.sm);
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    opacity: 0.9;
  }
`
