import { styled } from "@/panda/jsx"

export const SearchBar = styled.div`
  width: 600px;
  height: 50px;
  position: relative;
  display: inline-flex; 
  align-items: center;

  & > input {
    width: 100%;
    height: 100%;
    z-index: 2;
    color: token(colors.primary);
    background: token(colors.lightGray);
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #2c2929;
    outline: none;
  }
`

export const SearchShortcut = styled.div`
  width: 68.5px;
  height: 40px;
  z-index: 2;
  color: white;
  position: absolute;
  right: 0;
  border-radius: 5px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--rowdies);
  user-select: none;
  background: black;
  border-radius: 5px;
  transition: 100ms;

  & > * {
    animation: fadeIn 600ms;
  }

  &[data-focus=true] {
    width: 35px;
  }
`
