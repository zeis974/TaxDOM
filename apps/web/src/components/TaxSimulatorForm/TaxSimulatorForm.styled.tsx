import { styled } from "@/panda/jsx"

export const CaptchaContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (width < token(breakpoints.mobile)) {
    flex-direction: column;
  }
`
