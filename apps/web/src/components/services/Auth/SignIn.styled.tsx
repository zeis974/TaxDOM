import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"

export const SignInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${token("colors.darkGray")};
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  gap: 10px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 150ms;

  &:hover {
    background: transparent;
    border: 2px solid ${token("colors.darkGray")};
  }

  & span {
    line-height: 0;
  }
`
