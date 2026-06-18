import { styled } from "@/panda/jsx"

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const ListGrid = styled.div`
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 320px;
  padding: 32px 24px;
  text-align: center;
  color: token(colors.border);
  gap: 16px;

  & svg {
    width: 52px;
    height: 52px;
    opacity: 0.3;
  }

  & h3 {
    margin: 0;
    font-size: 18px;
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
