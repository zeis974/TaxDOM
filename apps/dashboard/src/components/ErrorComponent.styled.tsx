import { styled } from "@/styled-system/jsx"

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
  font-size: 24px;
  margin-bottom: 8px;
  color: token(colors.error);
`

export const ErrorMessage = styled.p`
  color: token(colors.gray);
  margin-bottom: 24px;
`

export const RetryButton = styled.button`
  padding: 10px 24px;
  background: token(colors.primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`
