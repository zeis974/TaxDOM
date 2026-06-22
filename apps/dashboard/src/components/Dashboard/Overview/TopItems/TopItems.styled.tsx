import { styled } from "@/panda/jsx"

export const Container = styled.div`
  background: token(colors.surface);
  border-radius: token(radii.md);
  padding: 20px;
  border: 1px solid token(colors.surface);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid token(colors.surface);

  & h2 {
    font-size: 1em;
    font-weight: 600;
    margin: 0;
    color: token(colors.foreground);
    font-family: token(fonts.nativeFont);
  }

  & > span {
    font-size: 0.813em;
    color: token(colors.surface);
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
  gap: 12px;
  padding: 10px 12px;
  background: token(colors.surface);
  border-radius: 6px;

  & .rank {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: token(colors.surface);
    border-radius: 4px;
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
      color: token(colors.surface);
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
  color: token(colors.surface);
  font-size: 0.875em;
`
