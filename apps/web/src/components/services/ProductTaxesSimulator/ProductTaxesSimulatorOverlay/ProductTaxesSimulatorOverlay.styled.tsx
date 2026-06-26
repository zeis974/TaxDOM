import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Container = styled(m.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 20px;
  font-family: token(fonts.nativeFont);
  flex-direction: column;
  height: inherit;

  & > div {
    position: relative;

    & p {
      margin: 10px 0;
    }

    & p:last-child {
      margin: 20px 0;
    }
  }
`

export const Underline = styled.span`
  text-decoration: underline dotted;
  text-underline-offset: 3px;
  cursor: pointer;
`
export const Wrapper = styled.div`
  max-width: 85%;
  margin: 0 auto;

  & > p {
    max-width: 600px;
  }
`
