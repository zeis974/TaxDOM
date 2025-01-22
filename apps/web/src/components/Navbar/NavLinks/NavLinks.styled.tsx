import { styled } from "@/panda/jsx"
import * as m from "motion/react-m"

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  gap: 50px;

  font-family: token(fonts.nativeFont);

  & > a,
  & span {
    padding: 10px;
    transition: background 150ms;
    color: token(colors.primary);
    border-radius: 5px;

    &:hover {
      background: token(colors.secondaryBackground);
    }
  }

  & span {
    display: inherit;
    gap: 5px;
  }
`

export const Backdrop = styled(m.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background: #0000008f;
  z-index: 1;
`
