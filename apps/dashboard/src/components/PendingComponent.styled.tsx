import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"

export const PendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px;
  text-align: center;
  font-family: ${token("fonts.nativeFont")};
`

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${token("colors.lightGray")};
  border-top-color: ${token("colors.primary")};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const PendingText = styled.p`
  color: ${token("colors.gray")};
  font-size: 14px;
`
