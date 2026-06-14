import { styled } from "@/panda/jsx"

export const OverrideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
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
