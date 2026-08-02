import { styled } from "@/panda/jsx"

export const PanelContainer = styled.div`
  width: 320px;
  border-left: 1px solid token(colors.border);
  background: token(colors.background);
  overflow-y: auto;
  padding: token(spacing.md);
  font-family: token(fonts.nativeFont);
`

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: token(spacing.md);
`

export const PanelTitle = styled.h3`
  margin: 0;
  font-size: token(fontSizes.body-sm);
  font-weight: 600;
  color: token(colors.foreground);
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: token(colors.textMuted);
  font-size: 20px;
  padding: token(spacing.xs);

  &:hover {
    color: token(colors.foreground);
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: token(colors.textMuted);
  text-align: center;
  gap: token(spacing.sm);
`

export const PaletteSection = styled.div`
  margin-top: token(spacing.lg);
  padding-top: token(spacing.md);
  border-top: 1px solid token(colors.border);
`

export const PaletteTitle = styled.h4`
  margin: 0 0 token(spacing.s12) 0;
  font-size: token(fontSizes.body-sm);
  font-weight: 600;
  color: token(colors.textMuted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

export const PaletteItem = styled.div`
  padding: 10px 16px;
  background: token(colors.elevated);
  border: 1px solid token(colors.border);
  border-radius: token(radii.md);
  cursor: grab;
  font-size: token(fontSizes.body-sm);
  font-weight: 500;
  text-align: center;
  color: token(colors.foreground);
  margin-bottom: token(spacing.sm);
  transition: all 150ms;

  &:hover {
    border-color: token(colors.foreground);
    box-shadow: 0 2px 8px token(colors.shadow);
  }
`
