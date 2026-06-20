import { styled } from "@/panda/jsx"

export const CharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 0.75rem;
  font-family: token(fonts.nativeFont);
  color: token(colors.border);
  margin-top: 4px;
  transition: color 150ms;

  &[data-warning="true"] {
    color: token(colors.error);
  }
`
