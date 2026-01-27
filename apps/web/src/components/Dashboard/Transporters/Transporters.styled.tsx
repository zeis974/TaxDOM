import { styled } from "@/panda/jsx"

export const Container = styled.div`
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 18px;
  background: token(colors.background);
  position: sticky;
  top: 0;
  z-index: 10;
`

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;

  & h2 {
    margin: 0;
  }

  & span {
    color: token(colors.darkGray);
    font-size: 14px;
    font-weight: 500;
  }
`

export const HeaderActions = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 10px;
`
