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
    background: token(colors.primary);
    color: white;
    border-color: token(colors.primary);
  }

  &[data-variant="primary"]:hover {
    background: token(colors.secondaryBackground);
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

  &[data-variant="danger"] {
    background: token(colors.danger);
    color: token(colors.dangerFg);
    border-color: transparent;
  }

  &[data-variant="danger"]:hover {
    background: token(colors.dangerHover);
  }

  &[data-variant="publish"] {
    background: token(colors.primary);
    color: token(colors.background);
    border-color: transparent;
  }

  &[data-variant="publish"]:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
