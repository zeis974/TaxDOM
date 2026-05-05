import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"

export const ButtonStyled = styled.button`
  height: 100%;
  padding: 10px;
  background: ${token("colors.tertiaryBackground")};
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 8px;

  &[disabled],
  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
