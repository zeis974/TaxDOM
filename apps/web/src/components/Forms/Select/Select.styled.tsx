import { styled } from "@/panda/jsx"

export const LoadingCircle = styled.div`
  position: absolute;
  right: 9px;
  bottom: 8px;
  border: 2px solid #3498db;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: rotate 1s linear infinite;
  opacity: 1;
  transition: opacity 250ms;
`
export const OptionContainer = styled.ul`
  width: 100%;
  border-radius: 5px;
  top: calc(100% + 5px);
  z-index: 1;
  position: absolute;
  border: 2px solid token(colors.darkGray);
  background: token(colors.secondaryBackground);

  & > li[data-selected=true],
  & > div > li[data-selected=true] {
    background: #77b4dc;
  } 

  & > li,
  & > div > li {
    cursor: pointer;
    display: block;
    transition: background 150ms;
    box-sizing: border-box;

    &[data-available="false"] {
      opacity: 0.5;
    }
  }

  & > div > li {
    position: absolute;
    padding: 5px;
  }

  & > li:not([style*="position: absolute"]) {
    position: relative;
    padding: 5px;
  }
`
