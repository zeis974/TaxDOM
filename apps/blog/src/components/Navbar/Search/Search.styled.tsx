import { styled } from "@/panda/jsx"

export const SearchBar = styled.div`
  width: 400px;
  height: 50px;
  position: relative;
  display: inline-flex;
  align-items: center;

  @media (width < 1100px) {
    display: none;
  }

  @media (width < 1200px) {
    width: 300px;
  }

  & > input {
    width: 100%;
    height: 100%;
    z-index: 2;
    color: token(colors.foreground);
    background: token(colors.elevated);
    border-radius: token(radii.sm);
    padding: 10px;
    border: none;
    outline: none;
  }
`

export const SearchShortcut = styled.div`
  width: 68.5px;
  height: 40px;
  z-index: 2;
  color: token(colors.background);
  position: absolute;
  font-family: token(fonts.rowdies);
  right: 0;
  border-radius: 2px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background: token(colors.foreground);
  border-radius: token(radii.sm);
  transition: 100ms;

  & > svg,
  & > span {
    animation: fadeIn 600ms;
  }

  &[data-focus="true"] {
    width: 35px;
  }
`
