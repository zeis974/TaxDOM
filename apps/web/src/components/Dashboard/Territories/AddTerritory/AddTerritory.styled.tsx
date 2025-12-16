import { styled } from "@/panda/jsx"

export const AddTerritoryBtn = styled.button`
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

export const AddTerritoryContainer = styled.div`
  width: 50vw;
  padding: 15px;
  
  & h2 {
    margin-bottom: 25px;
  }

  & hr {
    height: 1px;
    background: token(colors.secondaryBackground);
    border: none;
    margin-bottom: 25px;
  }
`

export const TerritoryActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`

export const ErrorContainer = styled.div`
  color: red;
  flex: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: bold;
`
