import { type ReactNode, useState } from "react"
import { Drawer } from "vaul"
import { SelectPortalContainerContext } from "@/components/Forms/Select/SelectPortalContext"
import {
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DetailDrawerBody,
  DetailDrawerCounter,
  DetailDrawerFooter,
  DetailDrawerHeader,
  DetailDrawerHeaderLeft,
  DetailDrawerHeaderTitle,
  DetailDrawerHeroActions,
  DetailDrawerIconButton,
  DetailDrawerNavButton,
  DetailDrawerNavGroup,
  DetailDrawerTitle,
} from "./Drawer.styled"
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, MoreIcon, NotificationIcon } from "./icons"

type EntityDetailDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Titre principal affiché dans le header. */
  title: ReactNode
  /** Sous-titre optionnel au-dessus du titre. */
  subtitle?: ReactNode
  /** Index courant pour la navigation prev/next (1-based affiché). */
  currentIndex?: number
  /** Nombre total d'éléments. */
  total?: number
  onPrev?: () => void
  onNext?: () => void
  /** Actions dans le header (à droite du titre). */
  headerActions?: ReactNode
  /** Pied de page optionnel (actions primaires/secondaires). */
  footer?: ReactNode
  children: ReactNode
}

/**
 * Drawer de détail/lecture compact.
 *
 * Un seul titre dans le header, pas de hero séparé.
 */
export function EntityDetailDrawer({
  open,
  onOpenChange,
  title,
  subtitle,
  currentIndex,
  total,
  onPrev,
  onNext,
  headerActions,
  footer,
  children,
}: EntityDetailDrawerProps) {
  const hasNav = onPrev !== undefined && onNext !== undefined
  const [contentEl, setContentEl] = useState<HTMLElement | null>(null)

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
      <Drawer.Portal>
        <DrawerOverlay />
        <Drawer.Content asChild>
          <DrawerContent ref={setContentEl}>
            <DetailDrawerHeader>
              <DetailDrawerHeaderLeft>
                {subtitle && <DetailDrawerHeaderTitle>{subtitle}</DetailDrawerHeaderTitle>}
                <DetailDrawerTitle>{title}</DetailDrawerTitle>
                {headerActions && <DetailDrawerHeroActions>{headerActions}</DetailDrawerHeroActions>}
              </DetailDrawerHeaderLeft>
              <DetailDrawerNavGroup>
                {hasNav && (
                  <>
                    <DetailDrawerNavButton
                      type="button"
                      onClick={onPrev}
                      disabled={currentIndex === undefined || currentIndex <= 0}
                      aria-label="Précédent"
                    >
                      <ChevronLeftIcon />
                    </DetailDrawerNavButton>
                    <DetailDrawerCounter>
                      {currentIndex !== undefined ? String(currentIndex + 1).padStart(2, "0") : "--"} /{" "}
                      {total ?? "--"}
                    </DetailDrawerCounter>
                    <DetailDrawerNavButton
                      type="button"
                      onClick={onNext}
                      disabled={
                        currentIndex === undefined || total === undefined || currentIndex >= total - 1
                      }
                      aria-label="Suivant"
                    >
                      <ChevronRightIcon />
                    </DetailDrawerNavButton>
                  </>
                )}
                <Drawer.Close asChild>
                  <DrawerCloseButton aria-label="Fermer">
                    <CloseIcon />
                  </DrawerCloseButton>
                </Drawer.Close>
              </DetailDrawerNavGroup>
            </DetailDrawerHeader>

            <DetailDrawerBody>
              <SelectPortalContainerContext.Provider value={contentEl}>
                {children}
              </SelectPortalContainerContext.Provider>
            </DetailDrawerBody>

            {footer && <DetailDrawerFooter>{footer}</DetailDrawerFooter>}
          </DrawerContent>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

/**
 * Actions header par défaut : notification + menu "more".
 */
export function DefaultHeaderActions() {
  return (
    <>
      <DetailDrawerIconButton type="button" aria-label="Notifications">
        <NotificationIcon />
      </DetailDrawerIconButton>
      <DetailDrawerIconButton type="button" aria-label="Plus d'actions">
        <MoreIcon />
      </DetailDrawerIconButton>
    </>
  )
}
