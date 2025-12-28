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
  position: relative;

  &:hover {
    border-color: token(colors.primary);
    box-shadow: 0 18px 32px rgba(15, 23, 42, 0.15);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 3px;
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
  letter-spacing: -0.01em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
`

export const BadgeContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

export const Badge = styled.span`
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 600;
  background: rgba(148, 163, 184, 0.18);
  color: token(colors.primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;

  &[data-type="eu"] {
    background: #dbeafe;
    color: #1e40af;
  }

  &[data-type="available"] {
    background: #dcfce7;
    color: #14532d;
  }

  &[data-type="unavailable"] {
    background: #fee2e2;
    color: #991b1b;
  }
`

export const ProductsCount = styled.span`
  color: token(colors.darkGray);
  font-size: 13px;
`

export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, token(colors.primary) 35%, transparent);
  backdrop-filter: blur(2px);
  z-index: 49;
`

export const DrawerContent = styled.div`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(420px, 100vw);
  height: 100vh;
  background: token(colors.background);
  border-left: 1px solid color-mix(in srgb, token(colors.darkGray) 50%, transparent);
  box-shadow: -24px 0 64px token(colors.shadow);
  display: flex;
  flex-direction: column;
  z-index: 50;
  font-family: token(fonts.nativeFont);
`

export const DrawerHeader = styled.header`
  padding: 22px 22px 18px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid color-mix(in srgb, token(colors.darkGray) 35%, transparent);
  gap: 20px;
  background: token(colors.background);
`

export const DrawerHeaderContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const DrawerHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const DrawerHeaderButton = styled.button`
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: color-mix(in srgb, token(colors.primary) 55%, transparent);
  transition: all 150ms ease;

  &:hover {
    background: token(colors.tertiaryBackground);
    color: token(colors.primary);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

export const DrawerSubtitle = styled.span`
  display: block;
  font-size: 13px;
  color: color-mix(in srgb, token(colors.primary) 55%, transparent);
  font-weight: 500;
  margin-top: 6px;
  font-family: token(fonts.nativeFont);
`

export const DrawerTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  letter-spacing: -0.01em;
`

export const DrawerBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
`

export const DrawerBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(148, 163, 184, 0.18);
  color: token(colors.primary);

  &[data-variant="available"] {
    background: #dcfce7;
    color: #166534;
  }

  &[data-variant="unavailable"] {
    background: #fee2e2;
    color: #991b1b;
  }

  &[data-variant="neutral"] {
    background: rgba(226, 232, 240, 0.7);
    color: rgba(15, 23, 42, 0.72);
  }
`

export const DrawerMeta = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: rgba(100, 116, 139, 0.85);
  font-size: 13px;
`

export const DrawerCloseButton = styled.button`
  background: transparent;
  color: color-mix(in srgb, token(colors.primary) 55%, transparent);
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
  transition: all 150ms ease;

  &:hover {
    background: token(colors.tertiaryBackground);
    color: token(colors.primary);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

export const DrawerForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
`

export const DrawerSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px 22px;
  border-bottom: 1px solid color-mix(in srgb, token(colors.darkGray) 25%, transparent);

  &:last-child {
    border-bottom: none;
  }
`

export const DrawerSectionDescription = styled.p`
  margin: 0;
  font-size: 13px;
  color: color-mix(in srgb, token(colors.primary) 55%, transparent);
  line-height: 1.6;
  font-family: token(fonts.nativeFont);
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;

  &[data-columns="1"] {
    grid-template-columns: 1fr;
  }
`

export const DrawerFooter = styled.footer`
  padding: 20px 28px 24px;
  border-top: 1px solid color-mix(in srgb, token(colors.darkGray) 35%, transparent);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  background: token(colors.background);
`

export const ActionsGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-left: auto;
  justify-content: flex-end;
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
  transition: background 150ms ease, transform 150ms ease;

  &:hover:not(:disabled) {
    background: #fecaca;
    transform: translateY(-0.5px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Modern Detail List Style (like the invoice example)
export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 49px;
  padding: 0;
  border-bottom: 1px solid color-mix(in srgb, token(colors.darkGray) 25%, transparent);
  gap: 16px;

  &:last-child {
    border-bottom: none;
  }
`

export const DetailLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: color-mix(in srgb, token(colors.primary) 55%, transparent);
  font-size: 13px;
  font-weight: 500;
  font-family: token(fonts.nativeFont);
  min-width: 0;
  flex: 1;
`

export const DetailIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: color-mix(in srgb, token(colors.primary) 45%, transparent);
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }
`

export const DetailValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: token(colors.primary);
  font-size: 13px;
  font-weight: 600;
  font-family: token(fonts.nativeFont);
  text-align: right;
  word-break: break-word;
  flex: 0 0 auto;
  justify-content: flex-end;
  min-width: 180px;
`

export const DetailValueInput = styled.input`
  box-sizing: border-box;
  width: 220px;
  max-width: 55vw;
  height: 34px;
  background: token(colors.secondaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 10px;
  padding: 6px 10px;
  color: token(colors.primary);
  font-size: 13px;
  font-weight: 600;
  font-family: token(fonts.nativeFont);
  text-align: right;

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }

  &::placeholder {
    color: color-mix(in srgb, token(colors.primary) 45%, transparent);
    font-weight: 600;
  }
`

export const DetailValueCopyable = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: token(colors.primary);
  font-size: 13px;
  font-weight: 600;
  font-family: token(fonts.nativeFont);
  cursor: pointer;
  padding: 0;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 14px;
    height: 14px;
    color: color-mix(in srgb, token(colors.primary) 45%, transparent);
  }
`

export const DetailLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: token(colors.blue);
  font-size: 13px;
  font-weight: 600;
  font-family: token(fonts.nativeFont);
  text-decoration: none;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.01em;

  &[data-status="approved"] {
    background: color-mix(in srgb, token(colors.blue) 18%, transparent);
    color: token(colors.blue);
  }

  &[data-status="pending"] {
    background: token(colors.tertiaryBackground);
    color: color-mix(in srgb, token(colors.primary) 70%, transparent);
  }

  &[data-status="failed"] {
    background: color-mix(in srgb, token(colors.error) 12%, transparent);
    color: token(colors.error);
  }
`

export const StatusTagButton = styled.button`
  border: none;
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: opacity 150ms ease, transform 150ms ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-0.5px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }

  &[data-status="approved"] {
    background: color-mix(in srgb, token(colors.blue) 18%, transparent);
    color: token(colors.blue);
  }

  &[data-status="pending"] {
    background: token(colors.tertiaryBackground);
    color: color-mix(in srgb, token(colors.primary) 70%, transparent);
  }

  &[data-status="failed"] {
    background: color-mix(in srgb, token(colors.error) 12%, transparent);
    color: token(colors.error);
  }
`

// Process History Timeline
export const ProcessHistoryTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
`

export const ProcessHistoryItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
  position: relative;

  &:not(:last-child)::before {
    content: "";
    position: absolute;
    left: 15px;
    top: 48px;
    bottom: 0;
    width: 2px;
    background: color-mix(in srgb, token(colors.darkGray) 45%, transparent);
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`

export const ProcessHistoryIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  &[data-status="success"] {
    background: color-mix(in srgb, token(colors.blue) 20%, transparent);
    color: token(colors.blue);
  }

  &[data-status="info"] {
    background: color-mix(in srgb, token(colors.blue) 20%, transparent);
    color: token(colors.blue);
  }

  &[data-status="warning"] {
    background: token(colors.tertiaryBackground);
    color: color-mix(in srgb, token(colors.primary) 70%, transparent);
  }

  &[data-status="pending"] {
    background: token(colors.tertiaryBackground);
    color: color-mix(in srgb, token(colors.primary) 55%, transparent);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

export const ProcessHistoryContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding-top: 4px;
`

export const ProcessHistoryTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const ProcessHistoryDescription = styled.p`
  margin: 0;
  font-size: 13px;
  color: color-mix(in srgb, token(colors.primary) 55%, transparent);
  line-height: 1.5;
  font-family: token(fonts.nativeFont);
`

export const ProcessHistoryTimestamp = styled.time`
  font-size: 12px;
  color: color-mix(in srgb, token(colors.primary) 45%, transparent);
  font-family: token(fonts.nativeFont);
  margin-top: 4px;
`

// Legacy components (keeping for compatibility)
export const OriginDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  background: rgba(248, 250, 252, 0.5);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
`

export const OriginDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const OriginDetailLabel = styled.span`
  font-size: 12px;
  color: rgba(100, 116, 139, 0.85);
  font-weight: 500;
  font-family: token(fonts.nativeFont);
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    width: 14px;
    height: 14px;
    opacity: 0.6;
  }
`

export const OriginDetailValue = styled.span`
  font-size: 14px;
  color: token(colors.primary);
  font-weight: 600;
  font-family: token(fonts.nativeFont);
  word-break: break-word;
`

export const ProcessHistoryPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background: rgba(248, 250, 252, 0.5);
  border: 1px dashed rgba(203, 213, 225, 0.6);
  border-radius: 12px;
  gap: 12px;
`

export const ProcessHistoryPlaceholderIcon = styled.div`
  font-size: 28px;
  opacity: 0.5;
`

export const ProcessHistoryText = styled.span`
  font-size: 13px;
  color: rgba(100, 116, 139, 0.7);
  font-weight: 500;
  text-align: center;
  font-family: token(fonts.nativeFont);
`

export const ProcessHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ProcessHistoryIcon = styled.div`
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 50%;
  flex-shrink: 0;
`
