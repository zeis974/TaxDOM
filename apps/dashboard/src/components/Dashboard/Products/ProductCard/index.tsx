import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Product } from "@taxdom/types"
import { useId, useMemo, useState } from "react"
import {
  Badge,
  CardInfo,
  crudHandlers,
  DetailIcon,
  DetailLabel,
  DetailList,
  DetailMeta,
  DetailMetaList,
  DetailRow,
  DetailValueInput,
  DetailValueSelect,
  Divider,
  DrawerSection,
  DrawerSectionTitle,
  EntityCard,
  EntityDetailDrawer,
  EntityDrawer,
  EntityDrawerActions,
  HeaderActionButton,
  StatusBadge,
  TimelineConnector,
  TimelineContainer,
  TimelineContent,
  TimelineDate,
  TimelineDescription,
  TimelineIcon,
  TimelineIconWrapper,
  TimelineItem,
  TimelineTitle,
} from "@/components/shared"
import { useCardDrawer } from "@/hooks/useCardDrawer"
import { useProductFormOptions } from "@/hooks/useProductFormOptions"
import { api } from "@/lib/api"

type Props = {
  product: Product
  editable?: boolean
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

const PencilIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
)

const TagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l7.3-7.3a1 1 0 0 0 0-1.41Z" />
    <path d="M7 7h.01" />
  </svg>
)

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
)

const HashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
)

const PercentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
)

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const EditHistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
)

export default function ProductCard({ product, editable = false }: Props) {
  const drawer = useCardDrawer()
  const { data: formOptions } = useProductFormOptions()
  const inputId = useId()
  const [productName, setProductName] = useState(product.productName)
  const [categoryID, setCategoryID] = useState(product.category.categoryID)
  const [originID, setOriginID] = useState(product.origin.originID)
  const [territoryID, setTerritoryID] = useState(product.territory.territoryID)

  const queryClient = useQueryClient()

  const updateMutation = useMutation(
    api.products.update.mutationOptions(
      crudHandlers(queryClient, api.products.index.pathKey(), {
        success: "Produit mis à jour",
        error: "Erreur lors de la mise à jour",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const deleteMutation = useMutation(
    api.products.destroy.mutationOptions(
      crudHandlers(queryClient, api.products.index.pathKey(), {
        success: "Produit supprimé",
        error: "Erreur lors de la suppression",
        onSuccess: drawer.closeDrawer,
      }),
    ),
  )

  const isFormValid = useMemo(
    () => Boolean(productName.trim() && categoryID && originID && territoryID),
    [productName, categoryID, originID, territoryID],
  )

  const resetForm = () => {
    setProductName(product.productName)
    setCategoryID(product.category.categoryID)
    setOriginID(product.origin.originID)
    setTerritoryID(product.territory.territoryID)
  }

  const handleCardClick = () => {
    resetForm()
    drawer.openDrawer()
  }

  const handleDetailOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) drawer.closeDrawer()
  }

  const handleEditOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm()
      drawer.closeDrawer()
    }
  }

  const handleStartEditing = () => {
    resetForm()
    drawer.startEditing()
  }

  const handleSave = () => {
    if (!isFormValid) return
    updateMutation.mutate({
      params: { id: product.productID },
      body: { productName: productName.trim(), categoryID, originID, territoryID },
    })
  }

  const handleDelete = () => {
    if (drawer.isDeletingLocal) return
    drawer.setIsDeletingLocal(true)
    drawer.setDeleteError(null)
    deleteMutation.mutate({ params: { id: product.productID } })
  }

  const isBusy = updateMutation.isPending || deleteMutation.isPending || drawer.isDeletingLocal

  return (
    <>
      <EntityCard
        title={product.productName}
        onClick={editable ? handleCardClick : undefined}
        badges={<Badge data-type="category">{product.category.categoryName}</Badge>}
      >
        <CardInfo>
          {product.origin.originName} • {product.territory.territoryName}
        </CardInfo>
      </EntityCard>

      {editable && (
        <>
          {/* Vue lecture */}
          <EntityDetailDrawer
            open={drawer.open && !drawer.isEditing}
            onOpenChange={handleDetailOpenChange}
            title={product.productName}
            subtitle={`Produit · #${product.productID}`}
            headerActions={
              <HeaderActionButton type="button" onClick={handleStartEditing} aria-label="Modifier">
                <PencilIcon />
              </HeaderActionButton>
            }
          >
            <DetailMetaList>
              <DetailMeta icon={<TagIcon />} label="Catégorie">
                {product.category.categoryName}
              </DetailMeta>
              <DetailMeta icon={<GlobeIcon />} label="Origine">
                {product.origin.originName}
                {product.origin.isEU && <StatusBadge active>UE</StatusBadge>}
              </DetailMeta>
              <DetailMeta icon={<MapIcon />} label="Territoire">
                {product.territory.territoryName}
              </DetailMeta>
              <DetailMeta icon={<HashIcon />} label="ID">
                {product.productID}
              </DetailMeta>
              <DetailMeta icon={<PercentIcon />} label="TVA">
                {product.tax.tva}%
              </DetailMeta>
              <DetailMeta icon={<PercentIcon />} label="OM">
                {product.tax.om}%
              </DetailMeta>
              <DetailMeta icon={<PercentIcon />} label="OMR">
                {product.tax.omr}%
              </DetailMeta>
              <DetailMeta icon={<CalendarIcon />} label="Créé le">
                {formatDateShort(product.createdAt)}
              </DetailMeta>
            </DetailMetaList>

            <Divider />

            <DrawerSection>
              <DrawerSectionTitle>Historique</DrawerSectionTitle>
              <TimelineContainer>
                <TimelineItem>
                  <TimelineIconWrapper>
                    <TimelineIcon data-status="success">
                      <CheckIcon />
                    </TimelineIcon>
                    <TimelineConnector />
                  </TimelineIconWrapper>
                  <TimelineContent>
                    <TimelineTitle>Produit créé</TimelineTitle>
                    <TimelineDescription>
                      Le produit a été créé et enregistré dans le système.
                    </TimelineDescription>
                    <TimelineDate>{formatDate(product.createdAt)}</TimelineDate>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineIconWrapper>
                    <TimelineIcon data-status="info">
                      <EditHistoryIcon />
                    </TimelineIcon>
                    <TimelineConnector />
                  </TimelineIconWrapper>
                  <TimelineContent>
                    <TimelineTitle>Dernière modification</TimelineTitle>
                    <TimelineDescription>
                      Les informations du produit ont été mises à jour.
                    </TimelineDescription>
                    <TimelineDate>{formatDate(product.updatedAt)}</TimelineDate>
                  </TimelineContent>
                </TimelineItem>
              </TimelineContainer>
            </DrawerSection>
          </EntityDetailDrawer>

          {/* Mode édition */}
          <EntityDrawer
            open={drawer.isEditing}
            onOpenChange={handleEditOpenChange}
            title={productName}
            subtitle={`Produit · #${product.productID}`}
            footer={
              <EntityDrawerActions
                onDelete={handleDelete}
                onSave={handleSave}
                saving={updateMutation.isPending}
                deleting={drawer.isDeletingLocal}
                saveDisabled={!isFormValid || isBusy}
                error={drawer.deleteError}
              />
            }
          >
            <DetailList>
              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <TagIcon />
                  </DetailIcon>
                  Nom
                </DetailLabel>
                <DetailValueInput
                  id={inputId}
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value.toUpperCase())}
                />
              </DetailRow>

              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <TagIcon />
                  </DetailIcon>
                  Catégorie
                </DetailLabel>
                <DetailValueSelect
                  value={categoryID}
                  onChange={(e) => setCategoryID(e.target.value)}
                >
                  {formOptions?.categories.map((c) => (
                    <option key={c.value} value={c.value ?? c.name}>
                      {c.name}
                    </option>
                  ))}
                </DetailValueSelect>
              </DetailRow>

              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <GlobeIcon />
                  </DetailIcon>
                  Origine
                </DetailLabel>
                <DetailValueSelect
                  value={originID}
                  onChange={(e) => setOriginID(e.target.value)}
                >
                  {formOptions?.origins.map((o) => (
                    <option key={o.value} value={o.value ?? o.name}>
                      {o.name}
                    </option>
                  ))}
                </DetailValueSelect>
              </DetailRow>

              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <MapIcon />
                  </DetailIcon>
                  Territoire
                </DetailLabel>
                <DetailValueSelect
                  value={territoryID}
                  onChange={(e) => setTerritoryID(e.target.value)}
                >
                  {formOptions?.territories.map((t) => (
                    <option key={t.value} value={t.value ?? t.name}>
                      {t.name}
                    </option>
                  ))}
                </DetailValueSelect>
              </DetailRow>
            </DetailList>
          </EntityDrawer>
        </>
      )}
    </>
  )
}
