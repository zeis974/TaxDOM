import { styled } from "@/panda/jsx"

/* ---------------------------------- Chrome --------------------------------- */

export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: token(colors.overlay);
  backdrop-filter: blur(4px);
  z-index: 49;
`

export const DrawerContent = styled.div`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(520px, 100vw);
  height: 100vh;
  background: token(colors.background);
  border-left: 1px solid token(colors.mutedBorder);
  box-shadow: -32px 0 80px token(colors.shadow);
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
  border-bottom: 1px solid token(colors.mutedBorder);
  gap: 24px;
`

export const DrawerHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const DrawerHeaderActions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
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
  color: token(colors.mutedText);
  font-weight: 600;
`

export const DrawerMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin-top: 8px;
  font-size: 13px;
  color: token(colors.mutedText);
`

export const DrawerCloseButton = styled.button`
  background: token(colors.tertiaryBackground);
  color: token(colors.primary);
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
  transition: background 150ms ease;

  &:hover {
    background: token(colors.secondaryBackground);
  }
`

export const HeaderActionButton = styled.button`
  background: transparent;
  color: token(colors.mutedText);
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 150ms ease;

  &:hover {
    background: token(colors.tertiaryBackground);
    color: token(colors.primary);
  }
`

/* ----------------------------------- Body ---------------------------------- */

export const DrawerForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

export const DrawerSectionTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: token(colors.mutedText);
  font-family: token(fonts.nativeFont);
`

export const DrawerSectionDescription = styled.p`
  margin: 0;
  font-size: 13px;
  color: token(colors.mutedText);
  line-height: 1.6;
  font-family: token(fonts.nativeFont);
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`

export const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  & > span {
    font-size: 14px;
    font-weight: 500;
    color: token(colors.primary);
  }
`

export const Divider = styled.div`
  height: 1px;
  background: token(colors.mutedBorder);
`

/* ---------------------------- Detail (read-only) --------------------------- */

export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
`

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid token(colors.mutedBorder);
  gap: 16px;

  &:last-child {
    border-bottom: none;
  }
`

export const DetailLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: token(colors.mutedText);
  font-family: token(fonts.nativeFont);
  min-width: 0;
  flex-shrink: 0;
`

export const DetailIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: token(colors.darkGray);
  flex-shrink: 0;
`

export const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  text-align: right;
  min-width: 0;
  word-break: break-word;
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

  &:focus {
    outline: none;
    border-color: token(colors.blue);
  }
`

export const DetailValueCopyable = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: token(colors.blue);
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

/* ---------------------------------- Footer --------------------------------- */

export const DrawerFooter = styled.footer`
  padding: 20px 32px 32px;
  border-top: 1px solid token(colors.mutedBorder);
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
  background: token(colors.danger);
  color: token(colors.dangerFg);
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  font-weight: 600;

  &:hover:not(:disabled) {
    background: token(colors.dangerHover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const RulesEditorButton = styled.button`
  background: token(colors.info);
  color: token(colors.infoFg);
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  font-weight: 600;
  transition: filter 150ms ease;

  &:hover:not(:disabled) {
    filter: brightness(0.97);
  }
`

/* --------------------------------- Timeline -------------------------------- */

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const TimelineItem = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
  padding-bottom: 24px;

  &:last-child {
    padding-bottom: 0;
  }
`

export const TimelineIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`

export const TimelineIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &[data-status="success"] {
    background: token(colors.success);
    color: token(colors.successFg);
  }

  &[data-status="info"] {
    background: token(colors.info);
    color: token(colors.infoFg);
  }

  &[data-status="warning"] {
    background: token(colors.warning);
    color: token(colors.warningFg);
  }
`

export const TimelineConnector = styled.div`
  width: 2px;
  flex: 1;
  background: token(colors.mutedBorder);
  margin-top: 8px;
  min-height: 16px;
`

export const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 4px;
  min-width: 0;
`

export const TimelineTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const TimelineDescription = styled.span`
  font-size: 13px;
  color: token(colors.mutedText);
  font-family: token(fonts.nativeFont);
  line-height: 1.5;
`

export const TimelineDate = styled.span`
  font-size: 12px;
  color: token(colors.darkGray);
  font-family: token(fonts.nativeFont);
`
