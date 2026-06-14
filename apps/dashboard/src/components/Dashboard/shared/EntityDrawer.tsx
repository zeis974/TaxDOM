import type { ReactNode } from "react"
import { Drawer } from "vaul"
import Button from "@/components/ui/Button"
import {
  ActionsGroup,
  DeleteButton,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderActions,
  DrawerHeaderContent,
  DrawerMeta,
  DrawerOverlay,
  DrawerSubtitle,
  DrawerTitle,
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
}

/**
 * Chrome de drawer latéral générique (overlay, entête, corps, pied).
 * Le corps et le pied sont composés par chaque domaine.
 */
export function EntityDrawer({
  open,
  onOpenChange,
  title,
  subtitle,
  meta,
  headerActions,
  children,
  footer,
}: EntityDrawerProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
      <Drawer.Portal>
        <DrawerOverlay />
        <Drawer.Content asChild>
          <DrawerContent>
            <DrawerHeader>
              <DrawerHeaderContent>
                {subtitle && <DrawerSubtitle>{subtitle}</DrawerSubtitle>}
                <DrawerTitle>{title}</DrawerTitle>
                {meta && <DrawerMeta>{meta}</DrawerMeta>}
              </DrawerHeaderContent>
              <DrawerHeaderActions>
                {headerActions}
                <Drawer.Close asChild>
                  <DrawerCloseButton aria-label="Fermer">&times;</DrawerCloseButton>
                </Drawer.Close>
              </DrawerHeaderActions>
            </DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
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

/**
 * Pied de drawer standard : erreur + Supprimer / Annuler / Sauvegarder.
 */
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
        <Button type="button" onClick={onSave} aria-disabled={saveDisabled || saving}>
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

/**
 * Bascule oui/non sous forme de deux pastilles (statut, zone UE, etc.).
 */
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
