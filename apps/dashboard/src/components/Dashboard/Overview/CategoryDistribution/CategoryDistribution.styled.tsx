import { styled } from "@/panda/jsx"

export const Container = styled.div`
  background: token(colors.elevated);
  border-radius: token(radii.md);
  padding: token(spacing.lg);
  border: 1px solid token(colors.border);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: token(spacing.md);
  padding-bottom: token(spacing.sm);
  border-bottom: 1px solid token(colors.border);

  & h2 {
    font-size: token(fontSizes.body-md);
    font-weight: 600;
    margin: 0;
    color: token(colors.foreground);
    font-family: token(fonts.nativeFont);
  }

  & > span {
    font-size: token(fontSizes.label-md);
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
  gap: token(spacing.xs);
`

export const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: token(spacing.sm);

  & .name {
    font-size: token(fontSizes.body-sm);
    font-weight: 500;
    color: token(colors.foreground);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .value {
    font-size: token(fontSizes.body-sm);
    font-weight: 600;
    color: token(colors.textMuted);
    flex-shrink: 0;
  }
`

export const Track = styled.div`
  height: token(spacing.sm);
  width: 100%;
  background: color-mix(in srgb, token(colors.border) 40%, transparent);
  border-radius: token(radii.full);
  overflow: hidden;
`

export const Bar = styled.div`
  height: 100%;
  background: token(colors.primary);
  border-radius: token(radii.full);
`

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: token(spacing.xl);
  color: token(colors.textMuted);
  font-size: token(fontSizes.body-sm);
`
