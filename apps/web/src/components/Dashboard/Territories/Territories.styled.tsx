import { styled } from "@/panda/jsx"

export const Container = styled.div`
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  background: token(colors.background);
  position: sticky;
  top: 0;
  z-index: 10;
`

export const HeaderTitle = styled.div`
  display: flex;
  align-items: end;
  gap: 15px;

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
