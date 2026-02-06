import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

export const TransportersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  padding: 4px;
  overflow-y: auto;
  flex: 1;
`

export const NoTransporters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  color: token(colors.darkGray);

  & svg {
    width: 64px;
    height: 64px;
    opacity: 0.5;
  }

  & h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
  }
`
