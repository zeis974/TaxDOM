import { styled } from "@/panda/jsx"

export const PageContainer = styled.div`
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

export const PageHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  background: token(colors.background);
  position: sticky;
  top: 0;
  z-index: 10;
`

export const PageHeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.xs);

  & h2 {
    margin: 0;
    font-size: token(fontSizes.headline-lg);
    font-weight: 600;
  }

  & span {
    color: token(colors.border);
    font-size: token(fontSizes.body-sm);
    font-weight: 500;
  }
`

export const PageHeaderActions = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 10px;
`
