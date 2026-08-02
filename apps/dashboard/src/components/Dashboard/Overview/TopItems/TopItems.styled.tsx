import { styled } from "@/panda/jsx"

export const Container = styled.div`
  background: token(colors.elevated);
  border: none;
  border-radius: token(radii.md);
  padding: token(spacing.s20);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: token(spacing.md);
  padding-bottom: token(spacing.s12);
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

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.sm);
`

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 80px;
  align-items: center;
  gap: token(spacing.s12);
  padding: 10px 12px;
  background: token(colors.elevated);
  border-radius: 6px;

  & .rank {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: token(colors.elevated);
    border-radius: token(radii.sm);
    font-weight: 600;
    font-size: 0.813em;
    color: token(colors.foreground);
  }

  & .info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    & .name {
      font-size: 0.875em;
      font-weight: 500;
      color: token(colors.foreground);
    }

    & .count {
      font-size: 0.75em;
      color: token(colors.textMuted);
    }
  }

  & .value {
    text-align: right;
    font-size: 0.875em;
    font-weight: 600;
    color: token(colors.foreground);
  }
`

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: token(spacing.xl);
  color: token(colors.textMuted);
  font-size: 0.875em;
`
