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

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.sm);
`

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;

  & .name {
    font-size: 0.875em;
    font-weight: 500;
    color: token(colors.foreground);
  }

  & .value {
    font-size: 0.813em;
    font-weight: 600;
    color: token(colors.foreground);
    white-space: nowrap;
  }
`

export const Track = styled.div`
  height: 8px;
  width: 100%;
  background: token(colors.border);
  border-radius: token(radii.lg);
  overflow: hidden;
`

export const Bar = styled.div`
  height: 100%;
  background: token(colors.primary);
  border-radius: token(radii.lg);
  transition: width 0.3s ease-out;
`

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: token(spacing.xl);
  color: token(colors.textMuted);
  font-size: 0.875em;
`
