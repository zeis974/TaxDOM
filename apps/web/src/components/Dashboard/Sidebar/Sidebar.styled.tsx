import { styled } from "@/panda/jsx"

export const Container = styled.nav`
  flex: 1;
  background: token(colors.secondaryBackground);
  height: calc(100% - 20px);
  padding: 20px;
  margin: 0 10px;
  border-radius: 10px;
  color: token(colors.primary);
  max-width: 250px;
  font-family: token(fonts.nativeFont);
`

export const List = styled.ul`
  & li {
    margin-bottom: 10px;
    border-radius: 10px;
    color: inherit;

    &[data-active="true"] {
      background: token(colors.tertiaryBackground);
    }

    & a {
      display: flex;
      align-items: center;
      gap: 10px;
      color: inherit;
      line-height: 1;
      width: 100%;
      height: 100%;
      padding: 10px;
    }

    &:hover  {
      background: token(colors.tertiaryBackground);
    }
  }
  
`
