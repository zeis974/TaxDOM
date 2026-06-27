import { motion } from "motion/react"
import { styled } from "@/panda/jsx"

export const Container = styled(motion.div)`
  position: absolute;
  border-radius: token(radii.lg);
  top: calc(100% + 10px);
  right: -150px;
  width: 500px;
  height: 100%;
  background: token(colors.bg);

  &::before {
    content: "";
    position: fixed;
    bottom: 100%;
    width: 160px;
    height: 100px;
  }

  & a:first-child > div {
    border-radius: token(radii.lg) token(radii.lg) 0 0;
  }

  & a:last-child > div {
    border-radius: 0 0 token(radii.lg) token(radii.lg);
  }
`
export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: token(colors.foreground);
  background: token(colors.bg);
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
