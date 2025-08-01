import { styled } from "@/panda/jsx"

export const Container = styled.div`
  color: token(colors.primary);
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  & h1 {
    font-weight: bold;
    font-family: token(fonts.nativeFont);
  }
`
