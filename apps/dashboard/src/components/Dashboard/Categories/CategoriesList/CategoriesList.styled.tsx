import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const CategoriesContainer = styled.div`
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`

export const NoCategories = styled.div`
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

  & svg {
    width: 64px;
    height: 64px;
    opacity: 0.3;
  }

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
