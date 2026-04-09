import { AnimatePresence } from "motion/react"
import { Backdrop, ModalContainer } from "./Modal.styled"

type Props = {
  children: React.ReactNode
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ children, show, setShow }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <Backdrop
          key="modal-backdrop"
          // initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onClick={() => setShow(false)}
        />
      )}
      {show && (
        <ModalContainer
          key="modal-content"
          style={{ x: "-50%", y: "-50%" }}
          initial={{ scale: 0.95 }}
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
