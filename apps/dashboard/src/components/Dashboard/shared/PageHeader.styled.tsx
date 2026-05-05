import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"

export const PageContainerBase = styled.div`
  color: ${token("colors.primary")};
  font-family: ${token("fonts.nativeFont")};
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const PageHeaderBase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  background: ${token("colors.background")};
  position: sticky;
  top: 0;
  z-index: 10;
`

export const PageHeaderTitleBase = styled.div`
  display: flex;
  align-items: end;
  gap: 15px;

  & h2 {
    margin: 0;
  }

  & span {
    color: ${token("colors.darkGray")};
    font-size: 14px;
    font-weight: 500;
  }
`

export const PageHeaderActionsBase = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 10px;
`
