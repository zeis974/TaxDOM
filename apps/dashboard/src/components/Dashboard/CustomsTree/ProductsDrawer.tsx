import { useQuery } from "@tanstack/react-query"
import { useRef } from "react"
import { useEscapeKey } from "@/hooks/useEscapeKey"
import { styled } from "@/panda/jsx"
import { formatHsCode } from "./format"
import type { NomenclatureNode } from "./TreeNode"

const API_BASE =
  (import.meta as { env: Record<string, string> }).env.VITE_API_URL || "http://localhost:3333"

type ProductSummary = {
  productID: string
  productName: string
  categoryName: string
  nomenclatureCode: string | null
}

async function fetchProductsByPrefix(code: string, signal: AbortSignal): Promise<ProductSummary[]> {
  const res = await fetch(
    `${API_BASE}/v1/admin/customs-nomenclatures/${encodeURIComponent(code)}/products`,
    { credentials: "include", headers: { Accept: "application/json" }, signal },
  )
  if (!res.ok) throw new Error("Erreur chargement produits")
  const json = await res.json()
  return json.data ?? []
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: token(colors.overlay);
  backdrop-filter: blur(3px);
  z-index: 49;
`

const Panel = styled.aside`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(440px, 100vw);
  height: 100vh;
  background: token(colors.background);
  border-left: 1px solid token(colors.border);
  box-shadow: -24px 0 60px token(colors.shadow);
  display: flex;
  flex-direction: column;
  z-index: 50;
  font-family: token(fonts.nativeFont);
`

const Header = styled.header`
  padding: 28px 28px 20px;
  border-bottom: 1px solid token(colors.border);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.xs);
`

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: token(colors.foreground);
`

const Subtitle = styled.span`
  font-size: token(fontSizes.label-md);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: token(colors.textMuted);
  font-weight: 600;
`

const CloseBtn = styled.button`
  background: token(colors.elevated);
  border: none;
  border-radius: token(radii.full);
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: token(fontSizes.headline-md);
  color: token(colors.foreground);
  flex-shrink: 0;
  &:hover { background: token(colors.elevated); }
`

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  gap: token(spacing.sm);
`

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: token(radii.md);
  background: token(colors.elevated);
  border: 1px solid token(colors.elevated);
`

const ProductName = styled.span`
  font-size: token(fontSizes.body-sm);
  font-weight: 500;
  color: token(colors.foreground);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ProductCode = styled.span`
  font-size: 10px;
  font-weight: 700;
  background: token(colors.elevated);
  padding: 2px 6px;
  border-radius: token(radii.sm);
  flex-shrink: 0;
  letter-spacing: 0.03em;
`

const CategoryBadge = styled.span`
  font-size: token(fontSizes.label-md);
  background: color-mix(in srgb, token(colors.primary) 12%, transparent);
  color: token(colors.primary);
  padding: 2px 8px;
  border-radius: token(radii.full);
  font-weight: 600;
  flex-shrink: 0;
`

const EmptyMsg = styled.p`
  text-align: center;
  color: token(colors.textMuted);
  font-size: token(fontSizes.body-sm);
  padding: 32px 0;
`

const LoadingMsg = styled.p`
  text-align: center;
  color: token(colors.textMuted);
  font-size: token(fontSizes.body-sm);
  padding: 32px 0;
  animation: pulse 1.5s ease-in-out infinite;
  @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
`

interface ProductsDrawerProps {
  node: NomenclatureNode
  onClose: () => void
}

export default function ProductsDrawer({ node, onClose }: ProductsDrawerProps) {
  const panelRef = useRef<HTMLElement>(null)

  const { data: products = [], isLoading: loading } = useQuery<ProductSummary[]>({
    queryKey: ["customs-nomenclatures", "products", node.code],
    queryFn: ({ signal }) => fetchProductsByPrefix(node.code, signal),
    staleTime: 1000 * 60,
  })

  useEscapeKey({ isActive: true, onEscape: onClose })

  return (
    <>
      <Overlay onClick={onClose} aria-hidden="true" />
      <Panel ref={panelRef} role="dialog" aria-label={`Produits — ${node.code}`}>
        <Header>
          <HeaderContent>
            <Title>{formatHsCode(node.code)}</Title>
            <Subtitle>{node.description}</Subtitle>
          </HeaderContent>
          <CloseBtn type="button" onClick={onClose} aria-label="Fermer">
            ×
          </CloseBtn>
        </Header>

        <Body>
          {loading && <LoadingMsg>Chargement des produits…</LoadingMsg>}
          {!loading && products.length === 0 && (
            <EmptyMsg>Aucun produit TaxDOM ne référence ce code dans sa nomenclature.</EmptyMsg>
          )}
          {products.map((p) => (
            <ProductRow key={p.productID}>
              {p.nomenclatureCode && <ProductCode>{p.nomenclatureCode}</ProductCode>}
              <ProductName title={p.productName}>{p.productName}</ProductName>
              <CategoryBadge>{p.categoryName}</CategoryBadge>
            </ProductRow>
          ))}
        </Body>
      </Panel>
    </>
  )
}
