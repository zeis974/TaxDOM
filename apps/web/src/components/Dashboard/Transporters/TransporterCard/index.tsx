"use client"

import { useActionState, useEffect, useId, useMemo, useState, useCallback } from "react"
import { Drawer } from "vaul"
import type { Transporter, TransporterFlowNode, TransporterFlowEdge } from "@taxdom/types"
import type { Node, Edge } from "@xyflow/react"
import Button from "@/components/ui/Button"
import { updateTransporter } from "@/actions/transporters/updateTransporter"
import { deleteTransporter } from "@/actions/transporters/deleteTransporter"
import { getTransporterRules } from "@/actions/transporters/getTransporterRules"
import { saveTransporterRules } from "@/actions/transporters/saveTransporterRules"
import RulesFlowModal from "../RulesFlow/RulesFlowModal"
import { flowToRules } from "../RulesFlow/hooks"
import {
  Card,
  ClickableCard,
  CardHeader,
  CardTitle,
  BadgeContainer,
  Badge,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerHeaderActions,
  DrawerSubtitle,
  DrawerTitle,
  DrawerCloseButton,
  DrawerForm,
  DrawerBody,
  DrawerSection,
  DrawerSectionTitle,
  DrawerSectionDescription,
  DetailList,
  DetailRow,
  DetailLabel,
  DetailIcon,
  DetailValue,
  DetailValueInput,
  StatusTagButton,
  DrawerFooter,
  ActionsGroup,
  ErrorContainer,
  DeleteButton,
} from "./TransporterCard.styled"

type Props = {
  transporter: Transporter
  onClick?: () => void
  editable?: boolean
}

export default function TransporterCard({ transporter, onClick, editable = false }: Props) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(updateTransporter, {
    success: false,
    errors: [],
  })
  const [transporterName, setTransporterName] = useState(transporter.transporterName)
  const [isAvailable, setIsAvailable] = useState(transporter.available)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showRulesModal, setShowRulesModal] = useState(false)
  const [rulesLoading, setRulesLoading] = useState(false)
  const [flowNodes, setFlowNodes] = useState<TransporterFlowNode[]>([])
  const [flowEdges, setFlowEdges] = useState<TransporterFlowEdge[]>([])

  const transporterNameId = useId()

  const isFormValid = useMemo(() => Boolean(transporterName.trim()), [transporterName])

  const resetForm = useCallback(() => {
    setTransporterName(transporter.transporterName)
    setIsAvailable(transporter.available)
    setDeleteError(null)
  }, [transporter])

  const handleOpenRulesModal = useCallback(async () => {
    setRulesLoading(true)
    try {
      const result = await getTransporterRules(transporter.transporterID)
      if (result.success && result.data) {
        setFlowNodes(result.data.flowNodes)
        setFlowEdges(result.data.flowEdges)
      }
      setShowRulesModal(true)
    } catch (err) {
      console.error("Error loading rules:", err)
    } finally {
      setRulesLoading(false)
    }
  }, [transporter.transporterID])

  const handleSaveRules = useCallback(
    async (nodes: Node[], edges: Edge[]) => {
      // Convertir les nœuds React Flow vers le format BDD
      const dbNodes = nodes.map((node) => ({
        nodeID: node.id,
        nodeType: node.type || "start",
        positionX: Math.round(node.position.x),
        positionY: Math.round(node.position.y),
        nodeData: node.data as Record<string, unknown>,
      }))

      const dbEdges = edges.map((edge) => ({
        edgeID: edge.id,
        sourceNodeID: edge.source,
        targetNodeID: edge.target,
        sourceHandle: edge.sourceHandle || null,
        edgeLabel: (edge.label as string) || null,
      }))

      // Générer les règles à partir du flow
      const rules = flowToRules(nodes, edges, transporter.transporterID)
      const dbRules = rules.map((rule) => ({
        ...rule,
        fee: rule.fee,
      }))

      const result = await saveTransporterRules({
        transporterID: transporter.transporterID,
        nodes: dbNodes,
        edges: dbEdges,
        rules: dbRules,
      })

      if (!result.success) {
        console.error("Error saving rules:", result.error)
      }
    },
    [transporter.transporterID],
  )

  const handleCardClick = useCallback(() => {
    onClick?.()
    if (!editable) return
    resetForm()
    setOpen(true)
  }, [onClick, editable, resetForm])

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)
      if (!nextOpen) resetForm()
    },
    [resetForm],
  )

  // Sync form state when transporter prop changes
  useEffect(() => {
    if (!open) resetForm()
  }, [open, resetForm])

  // Close drawer on successful update
  useEffect(() => {
    if (state?.success) setOpen(false)
  }, [state?.success])

  const onDelete = useCallback(async () => {
    if (isDeleting) return

    setIsDeleting(true)
    setDeleteError(null)

    try {
      const result = await deleteTransporter(transporter.transporterID)
      if (!result.success) {
        setDeleteError(result.error || "Erreur lors de la suppression")
      } else {
        setOpen(false)
      }
    } finally {
      setIsDeleting(false)
    }
  }, [isDeleting, transporter.transporterID])

  const CardContent = (
    <>
      <CardHeader>
        <CardTitle title={transporter.transporterName}>{transporter.transporterName}</CardTitle>
      </CardHeader>
      <BadgeContainer>
        <Badge data-type={transporter.available ? "available" : "unavailable"}>
          {transporter.available ? "Disponible" : "Indisponible"}
        </Badge>
      </BadgeContainer>
    </>
  )

  if (!editable) {
    return <Card onClick={onClick}>{CardContent}</Card>
  }

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange} direction="right">
      <Drawer.Trigger asChild>
        <ClickableCard onClick={handleCardClick}>{CardContent}</ClickableCard>
      </Drawer.Trigger>
      <Drawer.Portal>
        <DrawerOverlay />
        <Drawer.Content asChild>
          <DrawerContent>
            <Drawer.Title hidden>{transporter.transporterName}</Drawer.Title>
            <DrawerHeader>
              <DrawerHeaderContent>
                <DrawerTitle>{transporter.transporterName}</DrawerTitle>
                <DrawerSubtitle>#{transporter.transporterID.slice(0, 8)}...</DrawerSubtitle>
              </DrawerHeaderContent>
              <DrawerHeaderActions>
                <Drawer.Close asChild>
                  <DrawerCloseButton aria-label="Fermer le panneau">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </DrawerCloseButton>
                </Drawer.Close>
              </DrawerHeaderActions>
            </DrawerHeader>

            <DrawerForm action={action}>
              <input type="hidden" name="transporterID" value={transporter.transporterID} />
              <input type="hidden" name="available" value={String(isAvailable)} />
              <DrawerBody>
                <DrawerSection>
                  <DetailList>
                    <DetailRow>
                      <DetailLabel>
                        <DetailIcon>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </DetailIcon>
                        ID
                      </DetailLabel>
                      <DetailValue>{transporter.transporterID.slice(0, 12)}...</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>
                        <DetailIcon>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        </DetailIcon>
                        Nom
                      </DetailLabel>
                      <DetailValue>
                        <DetailValueInput
                          type="text"
                          id={transporterNameId}
                          name="transporterName"
                          value={transporterName}
                          onChange={(e) => setTransporterName(e.target.value)}
                          placeholder="Ex: DHL, FedEx..."
                          required
                        />
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
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </DetailIcon>
                        Statut
                      </DetailLabel>
                      <DetailValue>
                        <StatusTagButton
                          type="button"
                          data-status={isAvailable ? "approved" : "failed"}
                          onClick={() => setIsAvailable((prev) => !prev)}
                          aria-pressed={isAvailable}
                        >
                          {isAvailable ? "Disponible" : "Indisponible"}
                        </StatusTagButton>
                      </DetailValue>
                    </DetailRow>
                  </DetailList>
                </DrawerSection>

                <DrawerSection>
                  <DrawerSectionTitle>Règles de frais</DrawerSectionTitle>
                  <DrawerSectionDescription>
                    Configurez les frais appliqués par ce transporteur.
                  </DrawerSectionDescription>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleOpenRulesModal}
                    disabled={rulesLoading}
                    style={{ marginTop: "8px" }}
                  >
                    {rulesLoading ? "Chargement..." : "⚙️ Configurer les règles"}
                  </Button>
                </DrawerSection>

                {(state?.errors?.length > 0 || deleteError) && (
                  <DrawerSection>
                    <ErrorContainer>
                      {state?.errors?.map((error) => (
                        <span key={error}>{error}</span>
                      ))}
                      {deleteError && <span>{deleteError}</span>}
                    </ErrorContainer>
                  </DrawerSection>
                )}
              </DrawerBody>

              <DrawerFooter>
                <DeleteButton type="button" onClick={onDelete} disabled={isDeleting || pending}>
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </DeleteButton>
                <ActionsGroup>
                  <Button type="submit" disabled={!isFormValid || pending || isDeleting}>
                    {pending ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </ActionsGroup>
              </DrawerFooter>
            </DrawerForm>
          </DrawerContent>
        </Drawer.Content>
      </Drawer.Portal>

      <RulesFlowModal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
        transporterID={transporter.transporterID}
        transporterName={transporter.transporterName}
        initialNodes={flowNodes}
        initialEdges={flowEdges}
        onSave={handleSaveRules}
      />
    </Drawer.Root>
  )
}
