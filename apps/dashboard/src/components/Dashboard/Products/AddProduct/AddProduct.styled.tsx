import { styled } from "@/panda/jsx"

export const AddProductBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: token(colors.tertiaryBackground);
  font-weight: 500;
  border: 1px solid token(colors.darkGray);
  cursor: pointer;
  border-radius: 8px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-size: 14px;
  transition: all 150ms ease;

  &:hover {
    background: token(colors.secondaryBackground);
    border-color: token(colors.primary);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  & > *:first-child {
    grid-column: 1 / -1;
  }
`

export const ErrorContainer = styled.div`
  color: token(colors.error);
  font-weight: 500;
  font-size: 14px;
  font-family: token(fonts.nativeFont);
  margin-top: 0.75rem;
`

export const CharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 0.75rem;
  font-family: token(fonts.nativeFont);
  color: token(colors.darkGray);
  margin-top: 4px;
  transition: color 150ms;

  &[data-warning="true"] {
    color: token(colors.error);
  }
`
