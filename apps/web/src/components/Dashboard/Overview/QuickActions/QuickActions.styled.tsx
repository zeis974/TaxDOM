import { styled } from "@/panda/jsx"

export const Container = styled.div`
  background: token(colors.secondaryBackground);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid token(colors.tertiaryBackground);

  & h2 {
    font-size: 1em;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: token(colors.primary);
    font-family: token(fonts.nativeFont);
    padding-bottom: 12px;
    border-bottom: 1px solid token(colors.tertiaryBackground);
  }
`

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: token(colors.tertiaryBackground);
  border: 1px solid token(colors.tertiaryBackground);
  border-radius: 6px;
  color: token(colors.primary);
  font-size: 0.875em;
  font-weight: 500;
  cursor: pointer;
  font-family: token(fonts.nativeFont);

  & svg {
    width: 18px;
    height: 18px;
    color: token(colors.primary);
  }
`
