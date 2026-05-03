import { useCallback, useEffect, useRef } from "react"
import { useEscapeKey } from "../../hooks/useEscapeKey"
import { useFocusTrap } from "../../hooks/useFocusTrap"

interface UseModalOptions {
  show: boolean
  onClose: () => void
  onDirtyCheck?: () => boolean
}

export function useModal({ show, onClose, onDirtyCheck }: UseModalOptions) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when modal opens
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [show])

  const handleEscape = useCallback(() => {
    if (onDirtyCheck && onDirtyCheck()) {
      if (
        !window.confirm(
          "Vous avez des modifications non enregistrées. Voulez-vous vraiment fermer ?",
        )
      ) {
        return
      }
    }
    onClose()
  }, [onClose, onDirtyCheck])

  useEscapeKey({ isActive: show, onEscape: handleEscape })

  useFocusTrap({
    containerRef: modalRef,
    isActive: show,
  })

  const handleBackdropClick = useCallback(() => {
    if (onDirtyCheck && onDirtyCheck()) {
      if (
        !window.confirm(
          "Vous avez des modifications non enregistrées. Voulez-vous vraiment fermer ?",
        )
      ) {
        return
      }
    }
    onClose()
  }, [onClose, onDirtyCheck])

  return {
    modalRef,
    handleBackdropClick,
  }
}
