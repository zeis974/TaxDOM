import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  overflow: hidden;
`

export const ProductHeader = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  position: relative;

  & span {
    flex: 1;
  }

  &::before {
    content: "";
    position: absolute;
    background: linear-gradient(token(colors.background), transparent);
    opacity: 0.5;
    height: 13px;
    width: 100%;
    left: -5px;
    bottom: -15px;
  }
`

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: auto;
  padding-right: 10px;
`

export const ProductCard = styled.div`
  width: 100%;
  height: 75px;
  min-height: 75px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: token(colors.secondaryBackground);
  border-radius: 8px;
  transition: background 150ms;
  cursor: pointer;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    gap: 5px;
  }

  &:hover {
    background: token(colors.tertiaryBackground);
  }
`

export const Category = styled.span`
  width: fit-content;
  background: token(colors.background);
  padding: 2px 4px;
  border-radius: 4px;
`

export const Origin = styled.span`
  width: fit-content;
  background: token(colors.background);
  padding: 4px 5px;
  border-radius: 4px;
`

export const Flux = styled.span`
  width: fit-content;
  background: token(colors.background);
  padding: 4px 5px;
  border-radius: 4px;
`

export const Territory = styled.span`
  width: fit-content;
  background: token(colors.background);
  padding: 4px 5px;
  border-radius: 4px;
`

export const NoProducts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
