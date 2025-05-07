import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  gap: 15px;
  bottom: 30px;
  margin: 0 20px;
  height: calc(100% - token(sizes.navbarHeight));
  font-family: token(fonts.nativeFont);

  & button {
    margin-top: 10px;
  }
`
