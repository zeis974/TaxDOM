import { motion } from "motion/react"
import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  gap: 50px;

  font-family: var(--native-font);

  & > div:first-of-type {
    z-index: 2;
  }

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

export const Backdrop = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background: #0000008f;
  z-index: 1;
`
