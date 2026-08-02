import { motion } from "motion/react"
import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  gap: 50px;

  font-family: token(fonts.nativeFont);

  & > div:first-of-type {
    z-index: 2;
  }

  & > a,
  & span {
    padding: 10px;
    transition: background 150ms;
    color: token(colors.foreground);
    border-radius: token(radii.sm);

    &:hover {
      background: token(colors.elevated);
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
