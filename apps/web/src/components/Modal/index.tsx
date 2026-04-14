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
        <>
          <ModalContainer
            initial={{ opacity: 0, scale: 0.95, translate: "-50% -50%" }}
            animate={{ opacity: 1, scale: 1, translate: "-50% -50%" }}
            exit={{ opacity: 0, scale: 0.95, translate: "-50% -50%" }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </ModalContainer>
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
          />
        </>
      )}
    </AnimatePresence>
  )
}
