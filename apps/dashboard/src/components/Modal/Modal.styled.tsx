import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"

export const ModalContainer = styled(m.div)`
  color: ${token("colors.primary")};
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  border-radius: 16px;
  overflow: hidden;
`

export const Backdrop = styled(m.div)`
  position: fixed;
  inset: 0;
  background: #191a1b94;
  z-index: 9;
`

export const ModalCard = styled.div`
  width: 100%;
  min-width: 800px;
  background: ${token("colors.background")};
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-height: calc(100svh - 40px);
`

export const ModalIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${token("colors.secondaryBackground")};
  flex-shrink: 0;
  color: ${token("colors.primary")};
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 32px;
  border-bottom: 1px solid ${token("colors.secondaryBackground")};
`

export const ModalTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${token("colors.primary")};
  font-family: ${token("fonts.nativeFont")};
  line-height: 1.3;
`

export const ModalDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${token("colors.darkGray")};
  font-family: ${token("fonts.nativeFont")};
  line-height: 1.4;
`

export const ModalCloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${token("colors.primary")};
  cursor: pointer;
  flex-shrink: 0;
  transition: background 150ms ease;

  &:hover {
    background: ${token("colors.secondaryBackground")};
  }

  &:focus-visible {
    outline: 2px solid ${token("colors.blue")};
    outline-offset: 2px;
  }
`

export const ModalBody = styled.div`
  padding: 24px 32px;
  overflow-y: auto;
  flex: 1;
`

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 32px 28px;
  border-top: 1px solid ${token("colors.secondaryBackground")};
`
