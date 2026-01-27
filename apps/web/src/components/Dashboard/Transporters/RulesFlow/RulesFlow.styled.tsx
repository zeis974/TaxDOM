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

export const FlowSidebar = styled.aside`
  width: 280px;
  background: token(colors.secondaryBackground);
  border-right: 1px solid token(colors.darkGray);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
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

export const InspectorEmpty = styled.div`
  padding: 12px;
  border: 1px dashed token(colors.darkGray);
  border-radius: 10px;
  background: token(colors.background);
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
`

export const SidebarCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: token(colors.background);
  border: 1px solid token(colors.darkGray);
  border-radius: 10px;
  cursor: grab;
  transition: all 150ms ease;
  user-select: none;

  &:hover {
    border-color: token(colors.primary);
    box-shadow: 0 18px 32px rgba(15, 23, 42, 0.12);
  }

  &:active {
    cursor: grabbing;
  }
`

export const SidebarIcon = styled.span`
  font-size: 22px;
  line-height: 1;
  display: flex;
  align-items: center;
`

export const SidebarText = styled.div`
  flex: 1;
  min-width: 0;
`

export const SidebarCardTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const SidebarCardDesc = styled.div`
  font-size: 12px;
  color: token(colors.darkGray);
  margin-top: 2px;
  font-family: token(fonts.nativeFont);
`

export const SidebarHint = styled.div`
  margin-top: auto;
  padding: 12px;
  background: token(colors.tertiaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 10px;
  font-size: 12px;
  color: token(colors.darkGray);
  font-family: token(fonts.nativeFont);
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
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &[data-orphaned="true"] {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2), 0 18px 32px rgba(15, 23, 42, 0.08);
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
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &[data-orphaned="true"] {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2), 0 18px 32px rgba(15, 23, 42, 0.08);
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
  font-size: 18px;
  display: flex;
  align-items: center;
`

export const NodeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: token(colors.tertiaryBackground);
  border: 1px solid token(colors.darkGray);
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
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

export const NodeToolbar = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  padding: 6px 8px;
  background: token(colors.primary);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;

  .react-flow__node:hover & {
    opacity: 1;
    pointer-events: auto;
  }
`

export const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: token(colors.background);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: token(colors.background);
  }

  &.delete:hover {
    background: #ef4444;
    color: white;
  }
`

export const AddNodePanel = styled.div`
  position: absolute;
  top: 70px;
  right: 16px;
  background: token(colors.background);
  border: 1px solid token(colors.darkGray);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 200px;
`

export const AddNodeTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const AddNodeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 8px;
  border: 1px solid token(colors.darkGray);
  border-radius: 6px;
  background: token(colors.background);
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: token(colors.secondaryBackground);
    border-color: token(colors.primary);
  }

  &:last-child {
    margin-bottom: 0;
  }
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

export const NodeEditorHelp = styled.p`
  margin: 8px 0 0;
  font-size: 13px;
  color: token(colors.darkGray);
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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background: token(colors.background);
  border-radius: 12px;
  width: 90%;
  max-width: 1200px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid token(colors.darkGray);
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid token(colors.darkGray);
  background: token(colors.secondaryBackground);
`

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const ModalCloseButton = styled.button`
  background: token(colors.background);
  border: 1px solid token(colors.darkGray);
  border-radius: 10px;
  padding: 6px 10px;
  cursor: pointer;
  color: token(colors.primary);
  font-size: 14px;
  line-height: 1;
  font-family: token(fonts.nativeFont);

  &:hover {
    border-color: token(colors.primary);
  }
`

export const ModalBody = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid token(colors.darkGray);
`
