import { styled } from "@/panda/jsx"

/**
 * Bouton « Ajouter » unique pour toutes les pages (action primaire).
 */
export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: token(colors.tertiaryBackground);
  font-weight: 600;
  border: 1px solid token(colors.border);
  cursor: pointer;
  border-radius: 8px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-size: 14px;
  transition: all 150ms ease;

  &:hover {
    background: token(colors.secondaryBackground);
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
