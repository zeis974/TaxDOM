import { styled } from "@/panda/jsx"

export const ButtonStyled = styled.button`
  height: 100%;
  padding: 10px;
  background: token(colors.tertiaryBackground);
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);

  &[data-variant="primary"] {
    background: token(colors.primary);
    color: token(colors.background);
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
