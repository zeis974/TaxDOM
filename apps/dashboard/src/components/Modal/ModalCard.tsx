import { useId } from "react"
import Button from "@/components/ui/Button"
import {
  ModalCard as Card,
  ModalBody,
  ModalCloseBtn,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalIconWrapper,
  ModalTitle,
  ModalTitleGroup,
} from "./Modal.styled"

type Props = {
  children: React.ReactNode
  title?: string
  description?: string
  icon?: React.ReactNode
  onClose?: () => void
  onTitleIdChange?: (id: string) => void
  submitLabel: string
  onSubmit: () => void
  submitDisabled?: boolean
  submitLoading?: boolean
}

export default function ModalCard({
  children,
  title,
  description,
  icon,
  onClose,
  onTitleIdChange,
  submitLabel,
  onSubmit,
  submitDisabled,
  submitLoading,
}: Props) {
  const titleId = useId()

  if (onTitleIdChange) {
    onTitleIdChange(titleId)
  }

  return (
    <Card>
      {title && (
        <ModalHeader>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", flex: 1 }}>
            {icon && <ModalIconWrapper>{icon}</ModalIconWrapper>}
            <ModalTitleGroup>
              <ModalTitle id={titleId}>{title}</ModalTitle>
              {description && <ModalDescription>{description}</ModalDescription>}
            </ModalTitleGroup>
          </div>
          {onClose && (
            <ModalCloseBtn onClick={onClose} aria-label="Fermer">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ModalCloseBtn>
          )}
        </ModalHeader>
      )}
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
        )}
        <Button type="button" variant="primary" onClick={onSubmit} disabled={submitDisabled}>
          {submitLoading ? "Création..." : submitLabel}
        </Button>
      </ModalFooter>
    </Card>
  )
}
