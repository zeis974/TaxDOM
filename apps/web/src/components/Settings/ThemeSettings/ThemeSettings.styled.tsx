import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  color: token(colors.foreground);

  & > div:first-child {
    flex: 1;
    padding-bottom: 10px;

    & h3 {
      font-family: token(fonts.nativeFont);
    }
    
    & p {
      font-family: token(fonts.nativeFont);
      margin: 20px 0;
      color: token(colors.textMuted);
    }
  }
`

export const ThemeButton = styled.button`
  width: 100%;
  min-width: 250px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: token(radii.md);
  outline: none;
  border: 2px solid transparent;
  transition: 150ms border;
  margin-bottom: 10px;
  
  &:not([data-selected="true"]):hover {
    border: 2px solid token(colors.foreground);
  }

  &[data-selected="true"] {
    border: 2px solid token(colors.primary);
  }
`

export const ThemeContainer = styled.div`
  display: flex;
  flex: 2;
  font-family: token(fonts.nativeFont);

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 250px;
    height: auto;
    margin: 0 10px;
  }
`
