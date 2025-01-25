import { styled } from "@/panda/jsx"
import * as m from "motion/react-m"

export const Container = styled(m.div)`
  position: absolute;
  border-radius: 10px;
  top: calc(100% + 10px);
  right: -150px;
  width: 500px;
  height: 100%;
  background: white;

  &::before {
    content: "";
    position: fixed;
    bottom: 100%;
    width: 160px;
    height: 100px;
  }

  & a:first-child > div {
    border-radius: 10px 10px 0 0;
  }

  & a:last-child > div {
    border-radius: 0 0 10px 10px;
  }
`
export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: black;
  background: white;
  width: 100%;
  height: 100px;
  padding: 20px;
  gap: 20px;
  border-top: 1px solid gray;
  border-right: 1px solid gray;
  border-left: 1px solid gray;
  transition: background 150ms;

  &:hover {
    background: whitesmoke;
  }

  & > div:last-of-type {
    height: 40px;
    line-height: 1;

    & h3 {
      margin-bottom: 3px;
    }
    
    & p {
      line-height: 1;
      color: gray;
    }
  }
`
