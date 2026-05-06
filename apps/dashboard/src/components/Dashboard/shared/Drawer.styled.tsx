import { styled } from "@/panda/jsx"

export const DrawerOverlayBase = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 49;
`

export const DrawerContentBase = styled.div`
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

export const DrawerHeaderBase = styled.header`
  padding: 32px;
  padding-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(148, 163, 184, 0.24);
  gap: 24px;
`

export const DrawerHeaderContentBase = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const DrawerTitleBase = styled.h2`
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: token(colors.primary);
  letter-spacing: -0.02em;
  font-family: token(fonts.nativeFont);
`

export const DrawerSubtitleBase = styled.span`
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(100, 116, 139, 0.85);
  font-weight: 600;
`

export const DrawerCloseButtonBase = styled.button`
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

export const DrawerBodyBase = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`

export const DrawerSectionBase = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DetailListBase = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DetailRowBase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`

export const DetailLabelBase = styled.dt`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(100, 116, 139, 0.85);
`

export const DetailIconBase = styled.span`
  display: flex;
  align-items: center;
  color: rgba(100, 116, 139, 0.6);
`

export const DetailValueBase = styled.dd`
  font-size: 14px;
  color: token(colors.primary);
  font-weight: 500;
`

export const DetailValueInputBase = styled.input`
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
    border-color: token(colors.primary);
  }
`

export const StatusTagButtonBase = styled.button`
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

export const DrawerFooterBase = styled.footer`
  padding: 20px 32px 32px;
  border-top: 1px solid rgba(148, 163, 184, 0.24);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
`

export const ActionsGroupBase = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`

export const ErrorContainerBase = styled.div`
  color: token(colors.error);
  flex: 1;
  font-family: token(fonts.nativeFont);
  min-width: 220px;

  & span {
    display: block;
    margin-bottom: 6px;
  }
`

export const DeleteButtonBase = styled.button`
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
