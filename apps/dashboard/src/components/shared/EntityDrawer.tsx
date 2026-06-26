import { type ReactNode, useState } from "react"
import { Drawer } from "vaul"
import { SelectPortalContainerContext } from "@/components/Forms/Select/SelectPortalContext"
import Button from "@/components/ui/Button"
import {
  ActionsGroup,
  DeleteButton,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHero,
  DrawerHeroActions,
  DrawerHeroTitle,
  DrawerMeta,
  DrawerNavButton,
  DrawerNavCounter,
  DrawerNavGroup,
  DrawerOverlay,
  DrawerTopBar,
  DrawerTopBarLabel,
  DrawerTopBarLeft,
  DrawerTopBarRight,
  ErrorContainer,
  StatusTagButton,
} from "./Drawer.styled"

type EntityDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  subtitle?: ReactNode
  meta?: ReactNode
  headerActions?: ReactNode
  children: ReactNode
  footer: ReactNode
  currentIndex?: number
  total?: number
  onPrev?: () => void
  onNext?: () => void
}

export function EntityDrawer({
  open,
  onOpenChange,
  title,
  subtitle,
  meta,
  headerActions,
  children,
  footer,
  currentIndex,
  total,
  onPrev,
  onNext,
}: EntityDrawerProps) {
  const [contentEl, setContentEl] = useState<HTMLElement | null>(null)

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
      <Drawer.Portal>
        <DrawerOverlay />
        <Drawer.Content asChild>
          <DrawerContent ref={setContentEl}>
            <DrawerTopBar>
              <DrawerTopBarLeft>
                {subtitle && <DrawerTopBarLabel>{subtitle}</DrawerTopBarLabel>}
              </DrawerTopBarLeft>
              <DrawerTopBarRight>
                {onPrev !== undefined && onNext !== undefined && (
                  <DrawerNavGroup>
                    <DrawerNavButton
                      type="button"
                      onClick={onPrev}
                      disabled={currentIndex === 0}
                      aria-label="Précédent"
                    >
                      ‹
                    </DrawerNavButton>
                    {total !== undefined && currentIndex !== undefined && (
                      <DrawerNavCounter>
                        {String(currentIndex + 1).padStart(2, "0")} / {total}
                      </DrawerNavCounter>
                    )}
                    <DrawerNavButton
                      type="button"
                      onClick={onNext}
                      disabled={
                        currentIndex !== undefined &&
                        total !== undefined &&
                        currentIndex >= total - 1
                      }
                      aria-label="Suivant"
                    >
                      ›
                    </DrawerNavButton>
                  </DrawerNavGroup>
                )}
                <Drawer.Close asChild>
                  <DrawerCloseButton aria-label="Fermer">&times;</DrawerCloseButton>
                </Drawer.Close>
              </DrawerTopBarRight>
            </DrawerTopBar>

            <DrawerBody>
              <DrawerHero>
                <div>
                  <DrawerHeroTitle>{title}</DrawerHeroTitle>
                  {meta && <DrawerMeta>{meta}</DrawerMeta>}
                </div>
                {headerActions && <DrawerHeroActions>{headerActions}</DrawerHeroActions>}
              </DrawerHero>
              <SelectPortalContainerContext.Provider value={contentEl}>
                {children}
              </SelectPortalContainerContext.Provider>
            </DrawerBody>

            <DrawerFooter>{footer}</DrawerFooter>
          </DrawerContent>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

type EntityDrawerActionsProps = {
  onDelete: () => void
  onSave: () => void
  saving: boolean
  deleting: boolean
  saveDisabled: boolean
  error?: string | null
  extraActions?: ReactNode
}

export function EntityDrawerActions({
  onDelete,
  onSave,
  saving,
  deleting,
  saveDisabled,
  error,
  extraActions,
}: EntityDrawerActionsProps) {
  return (
    <>
      <ErrorContainer>{error && <span>{error}</span>}</ErrorContainer>
      <ActionsGroup>
        {extraActions}
        <DeleteButton type="button" onClick={onDelete} disabled={saving || deleting}>
          {deleting ? "Suppression..." : "Supprimer"}
        </DeleteButton>
        <Drawer.Close asChild>
          <Button type="button">Annuler</Button>
        </Drawer.Close>
        <Button type="button" onClick={onSave} disabled={saveDisabled || saving}>
          {saving ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </ActionsGroup>
    </>
  )
}

type BooleanToggleProps = {
  value: boolean
  onChange: (value: boolean) => void
  trueLabel: string
  falseLabel: string
}

export function BooleanToggle({ value, onChange, trueLabel, falseLabel }: BooleanToggleProps) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <StatusTagButton type="button" data-active={value} onClick={() => onChange(true)}>
        {trueLabel}
      </StatusTagButton>
      <StatusTagButton type="button" data-active={!value} onClick={() => onChange(false)}>
        {falseLabel}
      </StatusTagButton>
    </div>
  )
}
