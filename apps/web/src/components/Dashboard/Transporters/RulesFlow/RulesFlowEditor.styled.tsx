import { styled } from "@/panda/jsx"

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: token(colors.background);
`

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 12px;
  border-bottom: 1px solid token(colors.darkGray);
  background: token(colors.background);
  flex-shrink: 0;
`

export const PageHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`

export const PageBackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid token(colors.darkGray);
  border-radius: 8px;
  background: token(colors.background);
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: token(colors.secondaryBackground);
    border-color: token(colors.primary);
  }

  svg {
    width: 18px;
    height: 18px;
    color: token(colors.primary);
  }
`

export const PageHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid token(colors.darkGray);
  border-radius: 8px;
  background: token(colors.background);
  font-size: 13px;
  font-weight: 500;
  color: token(colors.primary);
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: token(fonts.nativeFont);

  &:hover {
    background: token(colors.secondaryBackground);
    border-color: token(colors.primary);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

export const PublishButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: token(colors.tertiaryBackground);
  font-weight: 500;
  border: 1px solid token(colors.darkGray);
  cursor: pointer;
  border-radius: 8px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-size: 14px;
  transition: all 150ms ease;

  &:hover:not(:disabled) {
    background: token(colors.secondaryBackground);
    border-color: token(colors.primary);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
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

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const PageSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: token(colors.darkGray);
  font-family: token(fonts.nativeFont);
`

export const PageTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

export const PageActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`

export const PageBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

export const FlowCanvas = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`

/* Right Panel - Add Node */
export const RightPanel = styled.aside`
  width: 320px;
  background: token(colors.background);
  border-left: 1px solid token(colors.darkGray);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const RightPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 12px;
  border-bottom: 1px solid token(colors.darkGray);
`

export const RightPanelTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: token(colors.darkGray);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: token(colors.secondaryBackground);
    color: token(colors.primary);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

export const TabsContainer = styled.div`
  display: flex;
  padding: 4px;
  gap: 0;
  background: token(colors.secondaryBackground);
  border-radius: 10px;
  margin: 12px 16px;
  position: relative;
  border: 1px solid token(colors.darkGray);
`

export const TabIndicator = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: token(colors.background);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;

  &[data-active="inspector"] {
    transform: translateX(100%);
  }
`

export const Tab = styled.button`
  flex: 1;
  padding: 10px 16px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: token(colors.darkGray);
  cursor: pointer;
  transition: color 0.2s ease, font-weight 0.2s ease;
  font-family: token(fonts.nativeFont);
  position: relative;
  z-index: 1;
  border-radius: 8px;

  &:hover:not([data-active="true"]) {
    color: token(colors.primary);
  }

  &[data-active="true"] {
    color: token(colors.primary);
    font-weight: 600;
  }
`

export const SearchContainer = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid token(colors.darkGray);
`

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: token(colors.secondaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 10px;
  transition: all 0.15s ease;

  &:focus-within {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  svg {
    width: 18px;
    height: 18px;
    color: token(colors.darkGray);
    flex-shrink: 0;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 14px;
    color: token(colors.primary);
    outline: none;
    font-family: token(fonts.nativeFont);

    &::placeholder {
      color: token(colors.darkGray);
    }
  }
`

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`

export const NodesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`

export const NodesSection = styled.div`
  margin: 0;
`

export const NodesSectionTitle = styled.h3`
  margin: 0;
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 600;
  color: token(colors.darkGray);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: token(fonts.nativeFont);
`

export const NodeCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: token(colors.background);
  border-bottom: 1px solid token(colors.darkGray);
  cursor: grab;
  transition: all 0.15s ease;
  user-select: none;

  &:hover {
    background: token(colors.secondaryBackground);
  }

  &:active {
    cursor: grabbing;
  }
`

export const NodeIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`

export const NodeInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const NodeCardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  margin-bottom: 2px;
`

export const NodeCardDesc = styled.div`
  font-size: 12px;
  color: token(colors.darkGray);
  font-family: token(fonts.nativeFont);
  line-height: 1.3;
`
