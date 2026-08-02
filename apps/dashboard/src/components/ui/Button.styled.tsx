import { styled } from "@/panda/jsx"

export const ButtonStyled = styled.button`
  height: 100%;
  padding: 10px 16px;
  background: token(colors.elevated);
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: token(radii.md);
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  font-size: token(fontSizes.body-sm);
  transition: all 150ms ease;

  &[data-variant="primary"] {
    background: token(colors.primary);
    color: token(colors.background);
    border-color: token(colors.primary);
  }

  &[data-variant="primary"]:hover {
    opacity: 0.85;
  }

  &[data-variant="outline"] {
    background: transparent;
    border-color: token(colors.elevated);
    color: token(colors.foreground);
  }

  &[data-variant="outline"]:hover {
    background: token(colors.elevated);
    border-color: token(colors.foreground);
  }

  &[data-variant="danger"] {
    background: token(colors.errorBg);
    color: token(colors.errorFg);
    border-color: transparent;
  }

  &[data-variant="danger"]:hover {
    background: color-mix(in srgb, token(colors.errorFg) 25%, token(colors.elevated));
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
