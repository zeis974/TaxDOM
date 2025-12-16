import { styled } from "@/panda/jsx"

export const Container = styled.div`
  margin-bottom: 10px;
  user-select: none;

  &:has(input[aria-disabled="true"]),
  &:has(input[disabled="true"]) {
    opacity: 0.5;
  }

  & input {
    margin-right: 10px;
  }

  & span {
    line-height: 1;
  }
`
