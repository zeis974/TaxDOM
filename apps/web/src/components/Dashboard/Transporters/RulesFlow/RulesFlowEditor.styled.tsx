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
  padding: 12px 20px;
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
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  font-size: 13px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: token(fonts.nativeFont);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

export const AddNodeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
  }

  svg {
    width: 24px;
    height: 24px;
  }
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
  padding: 0 16px;
  gap: 4px;
  border-bottom: 1px solid token(colors.darkGray);
`

export const Tab = styled.button`
  flex: 1;
  padding: 10px 12px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: token(colors.darkGray);
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: token(fonts.nativeFont);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;

  &:hover {
    color: token(colors.primary);
  }

  &[data-active="true"] {
    color: token(colors.primary);
    border-bottom-color: #3498db;
  }
`

export const SearchContainer = styled.div`
  padding: 12px 16px;
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

export const NodesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 16px;
`

export const NodesSection = styled.div`
  margin-bottom: 20px;
`

export const NodesSectionTitle = styled.h3`
  margin: 0 0 10px;
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
  padding: 12px;
  background: token(colors.background);
  border: 1px solid token(colors.darkGray);
  border-radius: 12px;
  cursor: grab;
  transition: all 0.15s ease;
  margin-bottom: 8px;
  user-select: none;

  &:hover {
    border-color: #3498db;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  &:active {
    cursor: grabbing;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const NodeIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
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

export const SelectButton = styled.button`
  padding: 6px 12px;
  border: 1px solid token(colors.darkGray);
  border-radius: 6px;
  background: token(colors.background);
  font-size: 12px;
  font-weight: 500;
  color: token(colors.primary);
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: token(fonts.nativeFont);

  &:hover {
    background: token(colors.secondaryBackground);
    border-color: #3498db;
  }
`

/* Inspector styles */
export const InspectorEmpty = styled.div`
  padding: 16px;
  text-align: center;
  color: token(colors.darkGray);
  font-size: 13px;
  font-family: token(fonts.nativeFont);
`

export const SidebarTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: token(colors.darkGray);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: token(fonts.nativeFont);
  padding: 16px 16px 8px;
`

export const FlowInspector = styled.aside`
  width: 340px;
  background: token(colors.secondaryBackground);
  border-left: 1px solid token(colors.darkGray);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
`
