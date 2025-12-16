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

export const DrawerSubtitle = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(100, 116, 139, 0.85);
  font-weight: 600;
`

export const DrawerTitle = styled.h2`
  margin: 6px 0 0;
  font-size: 26px;
  font-weight: 600;
  color: token(colors.primary);
  letter-spacing: -0.02em;
  font-family: token(fonts.nativeFont);
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
  transition: background 150ms ease, transform 150ms ease;

  &:hover {
    background: rgba(226, 232, 240, 0.9);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 3px;
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
  color: rgba(71, 85, 105, 0.85);
  font-family: token(fonts.nativeFont);
`

export const DrawerSectionDescription = styled.p`
  margin: 0;
  font-size: 13px;
  color: rgba(100, 116, 139, 0.85);
  line-height: 1.6;
  font-family: token(fonts.nativeFont);
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;

  &[data-columns="1"] {
    grid-template-columns: 1fr;
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
