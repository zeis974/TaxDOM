import { styled } from "@/panda/jsx"

export const ErrorContainer = styled.div`
  padding: token(spacing.s20);
  border: 1px solid token(colors.errorFg);
  border-radius: token(radii.md);
  background-color: token(colors.errorBg);
  color: token(colors.errorFg);
  margin: token(spacing.md) 0;
`

export const ErrorTitle = styled.h3`
  margin: 0 0 token(spacing.sm);
`

export const ErrorMessage = styled.p`
  margin: 0 0 token(spacing.s12);
`

export const RetryButton = styled.button`
  padding: token(spacing.sm) token(spacing.md);
  background-color: token(colors.errorFg);
  color: token(colors.background);
  border: none;
  border-radius: token(radii.sm);
  cursor: pointer;
  margin-top: token(spacing.sm);

  &:hover {
    opacity: 0.9;
  }
`
