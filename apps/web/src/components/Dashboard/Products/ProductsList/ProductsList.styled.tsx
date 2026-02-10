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

export const ProductCardRow = styled.button`
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
  border: none;
  text-align: left;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);

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

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }
`

export const CategoryBadge = styled.span`
  width: fit-content;
  background: token(colors.background);
  padding: 2px 4px;
  border-radius: 4px;
`

export const OriginBadge = styled.span`
  width: fit-content;
  background: token(colors.background);
  padding: 4px 5px;
  border-radius: 4px;
`

export const FluxBadge = styled.span`
  width: fit-content;
  background: token(colors.background);
  padding: 4px 5px;
  border-radius: 4px;
`

export const TerritoryBadge = styled.span`
  width: fit-content;
  background: token(colors.background);
  padding: 4px 5px;
  border-radius: 4px;
`

export const NoProducts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 400px;
  padding: 48px 24px;
  text-align: center;
  color: token(colors.darkGray);
  gap: 16px;

  & h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: token(colors.primary);
  }

  & p {
    margin: 0;
    font-size: 14px;
    max-width: 400px;
    line-height: 1.6;
  }
`

export const ResultsCount = styled.div`
  margin-bottom: 1rem;
  color: token(colors.darkGray);
  font-size: 14px;
  font-family: token(fonts.nativeFont);
`
