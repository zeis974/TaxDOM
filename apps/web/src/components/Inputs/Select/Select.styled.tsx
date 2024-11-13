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
  opacity: 0;
  transition: opacity 250ms;

  &[data-loading="true"] {
    border: 2px solid red;
    opacity: 1;
  }
`
export const OptionContainer = styled.ul`
  width: 100%;
  border-radius: 5px;
  top: calc(100% + 5px);
  z-index: 1;
  position: absolute;
  border: 2px solid token(colors.darkGray);
  background: token(colors.secondaryBackground);

  & > li[aria-selected=true] {
    background: #77b4dc;
  } 

  & > li {
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

  & > li:first-of-type {
    border-radius: 3px 3px 0 0;
  }

  & > li:last-of-type {
    border-radius: 0 0 3px 3px;
  }
`
