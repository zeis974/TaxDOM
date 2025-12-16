import { styled } from "@/panda/jsx"

export const Section = styled.section`
  display: flex;
  margin-top: 20px;
  height: calc(100svh - (token(sizes.navbarHeight) + 34px));
`

export const Content = styled.div`
  /* position: relative; */
  flex: 2;
  margin: 0 10px;
`
