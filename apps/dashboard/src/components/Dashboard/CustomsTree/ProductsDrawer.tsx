import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
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
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(3px);
  z-index: 49;
`

const Panel = styled.aside`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(440px, 100vw);
  height: 100vh;
  background: token(colors.background);
  border-left: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: -24px 0 60px rgba(15, 23, 42, 0.22);
  display: flex;
  flex-direction: column;
  z-index: 50;
  font-family: token(fonts.nativeFont);
`

const Header = styled.header`
  padding: 28px 28px 20px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: token(colors.primary);
`

const Subtitle = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(100, 116, 139, 0.7);
  font-weight: 600;
`

const CloseBtn = styled.button`
  background: rgba(226, 232, 240, 0.6);
  border: none;
  border-radius: 999px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: rgba(30, 41, 59, 0.8);
  flex-shrink: 0;
  &:hover { background: rgba(226, 232, 240, 0.9); }
`

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  background: token(colors.secondaryBackground);
  border: 1px solid token(colors.darkGray);
`

const ProductName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: token(colors.primary);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ProductCode = styled.span`
  font-size: 10px;
  font-weight: 700;
  background: token(colors.tertiaryBackground);
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
  letter-spacing: 0.03em;
`

const CategoryBadge = styled.span`
  font-size: 11px;
  background: #f3e8ff;
  color: #7c3aed;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
  flex-shrink: 0;
`

const EmptyMsg = styled.p`
  text-align: center;
  color: rgba(100, 116, 139, 0.7);
  font-size: 13px;
  padding: 32px 0;
`

const LoadingMsg = styled.p`
  text-align: center;
  color: rgba(100, 116, 139, 0.6);
  font-size: 13px;
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

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

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
