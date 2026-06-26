import { styled } from "@/panda/jsx"

export const ErrorContainer = styled.div`
  padding: 20px;
  border: 1px solid #ff6b6b;
  border-radius: 8px;
  background-color: #fff5f5;
  color: #c92a2a;
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
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    opacity: 0.9;
  }
`
