import { styled } from "@/panda/jsx"

export const FlowContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;
  border: 1px solid token(colors.darkGray);
  border-radius: 12px;
  overflow: hidden;
  background: token(colors.background);
  display: flex;
  flex-direction: column;
`
export const FlowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid token(colors.darkGray);
  background: token(colors.secondaryBackground);
`
export const FlowTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`
export const FlowActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
export const FlowSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: token(colors.darkGray);
  font-family: token(fonts.nativeFont);
`
export const FlowTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`
export const FlowBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`
export const FlowCanvas = styled.div`
  flex: 1;
  position: relative;
`
export const NodeBase = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  min-width: 150px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
export const StartNodeContainer = styled.div`
  padding: 14px 18px;
  border-radius: 12px;
  min-width: 160px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  background: token(colors.background);
  border: 1px solid token(colors.darkGray);
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`
export const ConditionNodeContainer = styled.div`
  padding: 14px 18px;
  border-radius: 12px;
  min-width: 220px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  background: token(colors.background);
  border: 2px solid token(colors.darkGray);
  color: token(colors.primary);
  position: relative;
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.08);
  font-family: token(fonts.nativeFont);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &[data-orphaned="true"] {
    border-color: #ef4444;
    box-shadow:
      0 0 0 3px rgba(239, 68, 68, 0.2),
      0 18px 32px rgba(15, 23, 42, 0.08);
  }
`
export const FeeNodeContainer = styled.div`
  padding: 14px 18px;
  border-radius: 12px;
  min-width: 160px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  background: token(colors.background);
  border: 2px solid token(colors.darkGray);
  color: token(colors.primary);
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.08);
  font-family: token(fonts.nativeFont);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &[data-orphaned="true"] {
    border-color: #ef4444;
    box-shadow:
      0 0 0 3px rgba(239, 68, 68, 0.2),
      0 18px 32px rgba(15, 23, 42, 0.08);
  }
`
export const NodeLabel = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: token(fonts.nativeFont);
`
export const NodeValue = styled.div`
  font-size: 13px;
  opacity: 0.9;
  margin-top: 4px;
  font-family: token(fonts.nativeFont);
`
export const NodeIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
    height: 18px;
  }
`
export const HandleLabel = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: token(colors.background);
  border: 1px solid token(colors.darkGray);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: token(fonts.nativeFont);
`
export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: token(colors.background);
`
export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid token(colors.darkGray);
  background: token(colors.secondaryBackground);
`
export const PageHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
export const PageHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
export const PageBackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: token(colors.primary);
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background 150ms;
  &:hover {
    background: token(colors.tertiaryBackground);
  }
  svg {
    width: 20px;
    height: 20px;
  }
`
export const PublishButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: token(colors.primary);
  color: token(colors.background);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-family: token(fonts.nativeFont);
  transition: opacity 150ms;
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`
export const PageBody = styled.main`
  flex: 1;
  overflow: hidden;
`
export const NodeEditorPanel = styled.div`
  position: relative;
  background: token(colors.background);
  border: 1px solid token(colors.darkGray);
  border-radius: 10px;
  padding: 12px;
  min-width: 0;
`
export const NodeEditorTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: token(colors.primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: token(fonts.nativeFont);
`
export const NodeEditorField = styled.div`
  margin-bottom: 12px;
  & label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: token(colors.darkGray);
    margin-bottom: 6px;
    font-family: token(fonts.nativeFont);
  }
  & input,
  & select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid token(colors.darkGray);
    border-radius: 6px;
    font-size: 14px;
    background: token(colors.background);
    color: token(colors.primary);
    font-family: token(fonts.nativeFont);
    &:focus {
      outline: none;
      border-color: token(colors.primary);
    }
  }
`
export const NodeEditorActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`
export const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: token(colors.secondaryBackground);
  border-radius: 8px;
`
export const PaletteItem = styled.div`
  padding: 10px 16px;
  background: token(colors.background);
  border: 1px solid token(colors.darkGray);
  border-radius: 8px;
  cursor: grab;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  transition: all 150ms;
  &:hover {
    border-color: token(colors.primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`
