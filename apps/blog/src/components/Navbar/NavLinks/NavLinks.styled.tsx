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

  @media (width < 768px) {
    display: none;
  }
`
