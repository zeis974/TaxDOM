import { styled } from "@/panda/jsx"

export const OptionContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  top: calc(100% + 5px);
  z-index: 1;
  position: absolute;
  border: 2px solid token(colors.darkGray);
  background: token(colors.secondaryBackground);

  & > span[aria-selected=true] {
    background: #77b4dc;
  } 

  & > span {
    cursor: pointer;
    position: relative;
    display: block;
    padding: 5px;
    transition: background 150ms;

    &[data-available="false"] {
      opacity: 0.5;

      &::before {
        content: "SOON";
        background: token(colors.background);
        font-size: 14px;
        padding: 5px;
        position: absolute;
        width: inherit;
        top: 6%;
        right: 5px;
        border-radius: 2px;
      }
    }
  }

  & > span:first-of-type {
    border-radius: 3px 3px 0 0;
  }

  & > span:last-of-type {
    border-radius: 0 0 3px 3px;
  }
`
