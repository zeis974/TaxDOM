import { styled } from "@/panda/jsx"

/**
 * Bouton « Ajouter » unique pour toutes les pages (action primaire).
 */
export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: token(spacing.sm);
  padding: 10px 16px;
  background: token(colors.elevated);
  font-weight: 600;
  border: 1px solid token(colors.border);
  cursor: pointer;
  border-radius: token(radii.md);
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  font-size: token(fontSizes.body-sm);
  transition: all 150ms ease;

  &:hover {
    border-color: token(colors.foreground);
  }

  &:focus-visible {
    outline: 2px solid token(colors.border);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
