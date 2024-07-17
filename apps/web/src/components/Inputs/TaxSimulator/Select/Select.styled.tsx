import { styled } from "@/panda/jsx"

export const OptionContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  top: calc(100% + 5px);
  z-index: 1;
  position: absolute;
  border: 2px solid #585858;
  background: token(colors.secondaryBackground);

  & > span[aria-selected=true] {
    background: #77b4dc;
  } 

  & > span {
    cursor: pointer;
    display: block;
    padding: 5px;
    transition: background 100ms;
  }

  & > span:first-of-type {
    border-radius: 3px 3px 0 0;
  }

  & > span:last-of-type {
    border-radius: 0 0 3px 3px;
  }
`
