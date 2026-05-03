import { AnimatePresence } from "motion/react"
import { Backdrop, ModalContainer } from "./Modal.styled"
import { useModal } from "./useModal"

type Props = {
  children: React.ReactNode
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  onDirtyCheck?: () => boolean
  titleId?: string
}

export default function Modal({ children, show, setShow, onDirtyCheck, titleId }: Props) {
  const { modalRef, handleBackdropClick } = useModal({
    show,
    onClose: () => setShow(false),
    onDirtyCheck,
  })

  return (
    <AnimatePresence>
      {show && (
        <Backdrop
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onClick={handleBackdropClick}
        />
      )}
      {show && (
        <ModalContainer
          ref={modalRef}
          key="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          style={{ x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {children}
        </ModalContainer>
      )}
    </AnimatePresence>
  )
}
