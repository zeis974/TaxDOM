import { styled } from "@/panda/jsx"
export const Card = styled.div`
  background: token(colors.secondaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 12px;
  padding: 18px;
  transition: all 200ms ease;
  cursor: default;
  width: 100%;
  text-align: left;
`
export const ClickableCard = styled.button`
  background: token(colors.secondaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 12px;
  padding: 18px;
  transition: all 200ms ease;
  cursor: pointer;
  width: 100%;
  text-align: left;
  &:hover {
    border-color: token(colors.primary);
    box-shadow: 0 18px 32px rgba(15, 23, 42, 0.15);
  }
`
export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
  min-width: 0;
  & > *:first-child {
    flex: 1;
    min-width: 0;
  }
`
export const CardTitle = styled.h3`
  margin: 0;
  color: token(colors.primary);
  font-size: 17px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const StatusBadge = styled.span`
  display: inline-block;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  font-weight: 500;
  &[data-active="true"] {
    background: #dcfce7;
    color: #166534;
  }
  &[data-active="false"] {
    background: #fee2e2;
    color: #991b1b;
  }
`
export const CardInfo = styled.span`
  color: token(colors.darkGray);
  font-size: 13px;
`
export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 49;
`
export const DrawerContent = styled.div`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(520px, 100vw);
  height: 100vh;
  background: token(colors.background);
  border-left: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: -32px 0 80px rgba(15, 23, 42, 0.28);
  display: flex;
  flex-direction: column;
  z-index: 50;
  font-family: token(fonts.nativeFont);
`
export const DrawerHeader = styled.header`
  padding: 32px;
  padding-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(148, 163, 184, 0.24);
  gap: 24px;
`
export const DrawerHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const DrawerTitle = styled.h2`
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: token(colors.primary);
  letter-spacing: -0.02em;
  font-family: token(fonts.nativeFont);
`
export const DrawerSubtitle = styled.span`
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(100, 116, 139, 0.85);
  font-weight: 600;
`
export const DrawerCloseButton = styled.button`
  background: rgba(226, 232, 240, 0.6);
  color: rgba(30, 41, 59, 0.85);
  border: none;
  border-radius: 999px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  &:hover {
    background: rgba(226, 232, 240, 0.9);
  }
`
export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`
export const DrawerSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const DetailList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`
export const DetailLabel = styled.dt`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(100, 116, 139, 0.85);
`
export const DetailIcon = styled.span`
  display: flex;
  align-items: center;
  color: rgba(100, 116, 139, 0.6);
`
export const DetailValue = styled.dd`
  font-size: 14px;
  color: token(colors.primary);
  font-weight: 500;
`
export const DetailValueInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid token(colors.darkGray);
  border-radius: 6px;
  font-size: 14px;
  background: token(colors.tertiaryBackground);
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  text-transform: uppercase;
  &:focus {
    outline: none;
    border-color: token(colors.primary);
  }
`
export const StatusTagButton = styled.button`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid token(colors.darkGray);
  background: token(colors.tertiaryBackground);
  color: token(colors.primary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  &[data-active="true"] {
    background: token(colors.primary);
    color: token(colors.background);
    border-color: token(colors.primary);
  }
`
export const DrawerFooter = styled.footer`
  padding: 20px 32px 32px;
  border-top: 1px solid rgba(148, 163, 184, 0.24);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
`
export const ActionsGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`
export const ErrorContainer = styled.div`
  color: token(colors.error);
  flex: 1;
  font-family: token(fonts.nativeFont);
  min-width: 220px;
  & span {
    display: block;
    margin-bottom: 6px;
  }
`
export const DeleteButton = styled.button`
  background: #fee2e2;
  color: #991b1b;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  font-weight: 600;
  &:hover:not(:disabled) {
    background: #fecaca;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
export const RulesEditorButton = styled.button`
  background: #dbeafe;
  color: #1e40af;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  font-weight: 600;
  &:hover:not(:disabled) {
    background: #bfdbfe;
  }
`
