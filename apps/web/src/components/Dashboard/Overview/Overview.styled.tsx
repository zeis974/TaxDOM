import { styled } from "@/panda/jsx"

export const Container = styled.div`
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const Header = styled.div`
  margin-bottom: 24px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & h1 {
    font-size: 1.5em;
    font-weight: 600;
    margin: 0;
    color: token(colors.primary);
  }

  & > div > span {
    font-size: 0.875em;
    color: token(colors.secondary);
  }
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
