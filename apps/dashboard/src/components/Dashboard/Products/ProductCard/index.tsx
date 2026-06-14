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
  DetailRow,
  DetailValue,
  Divider,
  DrawerSection,
  DrawerSectionDescription,
  DrawerSectionTitle,
  EntityCard,
  EntityDrawer,
  EntityDrawerActions,
  FormGrid,
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
} from "@/components/Dashboard/shared"
import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
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

  const handleCardClick = () => {
    setProductName(product.productName)
    setCategoryID(product.category.categoryID)
    setOriginID(product.origin.originID)
    setTerritoryID(product.territory.territoryID)
    drawer.openDrawer()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) drawer.setOpen(true)
    else drawer.closeDrawer()
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
        <EntityDrawer
          open={drawer.open}
          onOpenChange={handleOpenChange}
          title={product.productName}
          subtitle={`Produit · #${product.productID}`}
          footer={
            <EntityDrawerActions
              onDelete={handleDelete}
              onSave={handleSave}
              saving={updateMutation.isPending}
              deleting={deleteMutation.isPending || drawer.isDeletingLocal}
              saveDisabled={!isFormValid}
              error={drawer.deleteError}
            />
          }
        >
          <DrawerSection>
            <DrawerSectionTitle>Informations générales</DrawerSectionTitle>
            <DrawerSectionDescription>
              Mettez à jour le nom et la provenance de ce produit.
            </DrawerSectionDescription>
            <FormGrid>
              <InputContainer>
                <label htmlFor={inputId}>Nom du produit</label>
                <input
                  id={inputId}
                  type="text"
                  placeholder="Nom du produit"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </InputContainer>
              <BaseSelect
                label="Catégorie"
                options={formOptions?.categories ?? []}
                value={formOptions?.categories.find((c) => c.value === categoryID)?.name ?? ""}
                onChange={(val) => {
                  const found = formOptions?.categories.find((c) => c.name === val)
                  if (found) setCategoryID(found.value ?? found.name)
                }}
              />
              <BaseSelect
                label="Origine"
                options={formOptions?.origins ?? []}
                value={formOptions?.origins.find((o) => o.value === originID)?.name ?? ""}
                onChange={(val) => {
                  const found = formOptions?.origins.find((o) => o.name === val)
                  if (found) setOriginID(found.value ?? found.name)
                }}
              />
              <BaseSelect
                label="Territoire"
                options={formOptions?.territories ?? []}
                value={formOptions?.territories.find((t) => t.value === territoryID)?.name ?? ""}
                onChange={(val) => {
                  const found = formOptions?.territories.find((t) => t.name === val)
                  if (found) setTerritoryID(found.value ?? found.name)
                }}
              />
            </FormGrid>
          </DrawerSection>

          <DrawerSection>
            <DrawerSectionTitle>Détails</DrawerSectionTitle>
            <DetailList>
              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </DetailIcon>
                  ID
                </DetailLabel>
                <DetailValue>{product.productID}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </DetailIcon>
                  Origine
                </DetailLabel>
                <DetailValue>
                  {product.origin.originName}
                  {product.origin.isEU && <StatusBadge active>UE</StatusBadge>}
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </DetailIcon>
                  TVA
                </DetailLabel>
                <DetailValue>{product.tax.tva}%</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </DetailIcon>
                  OM
                </DetailLabel>
                <DetailValue>{product.tax.om}%</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </DetailIcon>
                  OMR
                </DetailLabel>
                <DetailValue>{product.tax.omr}%</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>
                  <DetailIcon>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </DetailIcon>
                  Créé le
                </DetailLabel>
                <DetailValue>{formatDateShort(product.createdAt)}</DetailValue>
              </DetailRow>
            </DetailList>
          </DrawerSection>

          <Divider />

          <DrawerSection>
            <DrawerSectionTitle>Historique</DrawerSectionTitle>
            <TimelineContainer>
              <TimelineItem>
                <TimelineIconWrapper>
                  <TimelineIcon data-status="success">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
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
        </EntityDrawer>
      )}
    </>
  )
}
