import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  overflow: hidden;
`

export const NoCategories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const CategoryCard = styled.div`
  min-width: 300px;
  height: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: token(colors.secondaryBackground);
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;

  & h3 {
    margin: 0;
    font-weight: 600;
    color: token(colors.primary);
  }

  & p {
    margin: 4px 0;
    font-size: 0.875rem;
    color: token(colors.primary);
  }
  
  &:hover {
    background: token(colors.tertiaryBackground);
  }

`
