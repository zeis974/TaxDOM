import { m } from "framer-motion"
import { styled } from "@/panda/jsx"

export const Container = styled.div`
  height: inherit;
  display: flex;
  flex-direction: row;
`

export const Card = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  font-family: token(fonts.nativeFont);
  border-radius: 5px;
  border: 2px solid token(colors.darkGray);
  cursor: pointer;

  transition: border 150ms;

  &:hover {
    border: 2px solid token(colors.primary);
  }

  &[data-open="true"] {
    & > svg:last-of-type {
      transform: rotate(180deg);
    }
  }

  & > svg:last-of-type {
    transition: transform 200ms;
  }

  & > hr {
    height: calc(100% - 10px);
    width: 1px;
    background: gray;
    border: none;
    margin: 5px 8px;
  }
`

export const Illustration = styled.div`
  width: 30px;
  display: inherit;
  margin: 0 5px 0 0;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  
  & > h3,
  & > span {
    line-height: 1;
  }

  & h3 {
    font-family: token(fonts.nativeFont);
  }

  & span {
    font: 0.8em token(fonts.NotoSans);
  }
`

export const ModalContainer = styled(m.div)`
  width: 100%;
  height: auto;
  position: absolute;
  top: 55px;
  right: 0;
  left: 0;
  z-index: 1;
  border-radius: 10px;
  background: token(colors.background);
  border: 2px solid token(colors.darkGray);
`

export const ModalCard = styled.div`
  color: token(colors.primary);
  display: flex;
  background: token(colors.secondaryBackground);
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid transparent;
  cursor: pointer;
  outline: 1px solid transparent;
  transition: 150ms outline;

  &:hover {
    outline: 1px solid token(colors.primary);
  }
`
