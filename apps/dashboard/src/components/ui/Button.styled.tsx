import { styled } from "@/panda/jsx"

export const ButtonStyled = styled.button`
  height: 100%;
  padding: 10px 16px;
  background: token(colors.surface);
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 8px;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  font-size: 0.875rem;
  transition: all 150ms ease;

  &[data-variant="primary"] {
    background: token(colors.peterRiver);
    color: white;
    border-color: token(colors.peterRiver);
  }

  &[data-variant="primary"]:hover {
    filter: brightness(1.1);
  }

  &[data-variant="outline"] {
    background: transparent;
    border-color: token(colors.surface);
    color: token(colors.foreground);
  }

  &[data-variant="outline"]:hover {
    background: token(colors.surface);
    border-color: token(colors.foreground);
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
