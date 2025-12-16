import { styled } from "@/panda/jsx"

export const Container = styled.div`
  background: token(colors.secondaryBackground);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid token(colors.tertiaryBackground);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid token(colors.tertiaryBackground);

  & h2 {
    font-size: 1em;
    font-weight: 600;
    margin: 0;
    color: token(colors.primary);
    font-family: token(fonts.nativeFont);
  }

  & > span {
    font-size: 0.813em;
    color: token(colors.secondary);
  }
`

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: token(colors.tertiaryBackground);
  border-radius: 6px;

  & .product-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    & h3 {
      font-size: 0.875em;
      font-weight: 500;
      margin: 0;
      color: token(colors.primary);
    }

    & .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75em;
      color: token(colors.secondary);

      & .category {
        background: token(colors.secondaryBackground);
        padding: 2px 6px;
        border-radius: 3px;
      }

      & .separator {
        opacity: 0.5;
      }
    }
  }

  & .date {
    font-size: 0.75em;
    color: token(colors.secondary);
  }
`

export const NoActivity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  color: token(colors.secondary);
  font-size: 0.875em;
`
