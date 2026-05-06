import { styled } from "@/panda/jsx"

export const ButtonStyled = styled.button`
  height: 100%;
  padding: 10px 16px;
  background: token(colors.tertiaryBackground);
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 8px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-size: 0.875rem;
  transition: all 150ms ease;

  &[data-variant="primary"] {
    background: token(colors.blue);
    color: white;
    border-color: token(colors.blue);
  }

  &[data-variant="primary"]:hover {
    filter: brightness(1.1);
  }

  &[data-variant="outline"] {
    background: transparent;
    border-color: token(colors.darkGray);
    color: token(colors.primary);
  }

  &[data-variant="outline"]:hover {
    background: token(colors.secondaryBackground);
    border-color: token(colors.primary);
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
