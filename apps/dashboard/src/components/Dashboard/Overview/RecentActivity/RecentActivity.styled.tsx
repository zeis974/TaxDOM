import { styled } from "@/panda/jsx"

export const Container = styled.div`
  background: token(colors.elevated);
  border: none;
  border-radius: token(radii.md);
  padding: 20px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid token(colors.border);

  & h2 {
    font-size: 1em;
    font-weight: 600;
    margin: 0;
    color: token(colors.foreground);
    font-family: token(fonts.nativeFont);
  }

  & > span {
    font-size: 0.813em;
    color: token(colors.textMuted);
  }
`

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.sm);
`

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: token(colors.elevated);
  border-radius: 6px;

  & .product-info {
    display: flex;
    flex-direction: column;
    gap: token(spacing.xs);

    & h3 {
      font-size: 0.875em;
      font-weight: 500;
      margin: 0;
      color: token(colors.foreground);
    }

    & .meta {
      display: flex;
      align-items: center;
      gap: token(spacing.sm);
      font-size: 0.75em;
      color: token(colors.textMuted);

      & .category {
        background: token(colors.elevated);
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
    color: token(colors.textMuted);
  }
`

export const NoActivity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: token(spacing.xl);
  color: token(colors.textMuted);
  font-size: 0.875em;
`
