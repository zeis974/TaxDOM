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
  gap: 8px;
  margin-top: 16px;
`

export const DrawerBadge = styled.span`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  background: token(colors.tertiaryBackground);
  color: token(colors.primary);
  border: 1px solid token(colors.darkGray);

  &[data-available="true"] {
    background: #dcfce7;
    color: #14532d;
    border-color: #bbf7d0;
  }

  &[data-available="false"] {
    background: #fee2e2;
    color: #991b1b;
    border-color: #fecaca;
  }
`

export const DrawerMeta = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid token(colors.secondaryBackground);
  color: token(colors.darkGray);
  font-size: 13px;

  & span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
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

export const DrawerSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: token(colors.primary);
  margin: 0 0 8px 0;
`

export const DrawerSectionDescription = styled.p`
  font-size: 13px;
  color: color-mix(in srgb, token(colors.primary) 55%, transparent);
  margin: 0;
  line-height: 1.5;
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
  font-family: token(fonts.nativeFont);
  font-size: 13px;

  & span {
    display: block;
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
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

// Detail List components (like OriginCard)
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

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  font-family: token(fonts.nativeFont);
  line-height: 1;
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
  appearance: none;
  -webkit-appearance: none;
  font-family: token(fonts.nativeFont);
  line-height: 1;
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

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const RadioOption = styled.div`
  position: relative;
`

export const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

export const RadioLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: token(colors.tertiaryBackground);
  border: 2px solid token(colors.darkGray);
  border-radius: 10px;
  cursor: pointer;
  transition: all 150ms ease;

  &[data-checked="true"] {
    border-color: token(colors.primary);
    background: rgba(59, 130, 246, 0.05);
  }

  &:hover {
    border-color: token(colors.primary);
  }

  .indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid token(colors.darkGray);
    flex-shrink: 0;
    position: relative;
    margin-top: 2px;
    transition: all 150ms ease;
  }

  &[data-checked="true"] .indicator {
    border-color: token(colors.primary);
    background: token(colors.primary);

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
    }
  }

  .text {
    font-weight: 600;
    font-size: 14px;
    color: token(colors.primary);
    display: block;
  }

  .description {
    font-size: 13px;
    color: token(colors.darkGray);
    display: block;
    margin-top: 2px;
  }
`
