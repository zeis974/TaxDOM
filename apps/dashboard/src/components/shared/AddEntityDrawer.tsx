import { type ReactNode, useState } from "react"
import { Drawer } from "vaul"
import { SelectPortalContainerContext } from "@/components/Forms/Select/SelectPortalContext"
import Button from "@/components/ui/Button"
import { AddButton } from "./AddButton.styled"
import {
  ActionsGroup,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerOverlay,
  DrawerTitle,
  ErrorContainer,
} from "./Drawer.styled"
import { PlusIcon } from "./icons"

type AddEntityDrawerProps = {
  triggerLabel: string
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onTriggerClick: () => void
  formId: string
  onSubmit: () => void
  submitLabel: string
  submitting: boolean
  submitDisabled: boolean
  error?: string | null
  children: ReactNode
}

/**
 * Drawer d'ajout générique (vaul) : bouton déclencheur + formulaire dans un
 * panneau latéral, pied Annuler / Créer. Pattern unique pour toutes les pages.
 */
export function AddEntityDrawer({
  triggerLabel,
  title,
  open,
  onOpenChange,
  onTriggerClick,
  formId,
  onSubmit,
  submitLabel,
  submitting,
  submitDisabled,
  error,
  children,
}: AddEntityDrawerProps) {
  const [contentEl, setContentEl] = useState<HTMLElement | null>(null)

  return (
    <>
      <AddButton type="button" onClick={onTriggerClick}>
        <PlusIcon />
        {triggerLabel}
      </AddButton>

      <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
        <Drawer.Portal>
          <DrawerOverlay />
          <Drawer.Content asChild>
            <DrawerContent ref={setContentEl}>
              <DrawerHeader>
                <DrawerHeaderContent>
                  <DrawerTitle>{title}</DrawerTitle>
                </DrawerHeaderContent>
                <Drawer.Close asChild>
                  <DrawerCloseButton aria-label="Fermer">&times;</DrawerCloseButton>
                </Drawer.Close>
              </DrawerHeader>

              <DrawerBody>
                <form
                  id={formId}
                  onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                  }}
                  autoComplete="off"
                >
                  <SelectPortalContainerContext.Provider value={contentEl}>
                    {children}
                  </SelectPortalContainerContext.Provider>
                  {error && (
                    <ErrorContainer>
                      <span>{error}</span>
                    </ErrorContainer>
                  )}
                </form>
              </DrawerBody>

              <DrawerFooter>
                <ActionsGroup>
                  <Drawer.Close asChild>
                    <Button type="button" variant="outline">
                      Annuler
                    </Button>
                  </Drawer.Close>
                  <Button
                    type="submit"
                    form={formId}
                    variant="primary"
                    disabled={submitDisabled || submitting}
                  >
                    {submitting ? "Création..." : submitLabel}
                  </Button>
                </ActionsGroup>
              </DrawerFooter>
            </DrawerContent>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}
