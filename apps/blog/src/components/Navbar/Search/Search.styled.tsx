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
    color: token(colors.primary);
    background: token(colors.darkGray);
    border-radius: 5px;
    padding: 10px;
    border: none;
    outline: none;
  }
`

export const SearchShortcut = styled.div`
  width: 68.5px;
  height: 40px;
  z-index: 2;
  color: white;
  position: absolute;
  font-family: "Rowdies", serif;
  right: 0;
  border-radius: 2px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background: black;
  border-radius: 5px;
  transition: 100ms;

  & > svg,
  & > span {
    animation: fadeIn 600ms;
  }

  &[data-focus=true] {
    width: 35px;
  }
`
