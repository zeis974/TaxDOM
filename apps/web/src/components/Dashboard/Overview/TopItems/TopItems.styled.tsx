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

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 80px;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: token(colors.tertiaryBackground);
  border-radius: 6px;

  & .rank {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: token(colors.secondaryBackground);
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.813em;
    color: token(colors.primary);
  }

  & .info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    & .name {
      font-size: 0.875em;
      font-weight: 500;
      color: token(colors.primary);
    }

    & .count {
      font-size: 0.75em;
      color: token(colors.secondary);
    }
  }

  & .value {
    text-align: right;
    font-size: 0.875em;
    font-weight: 600;
    color: token(colors.primary);
  }
`

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  color: token(colors.secondary);
  font-size: 0.875em;
`
