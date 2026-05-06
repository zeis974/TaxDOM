import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"

export const Container = styled.div`
  color: ${token("colors.primary")};
  font-family: ${token("fonts.nativeFont")};
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
