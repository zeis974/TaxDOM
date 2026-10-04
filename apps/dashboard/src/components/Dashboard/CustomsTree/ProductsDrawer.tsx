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

const Overlay = styled("div", {
  base: {
    position: "fixed",
    inset: "0",
    background: "{colors.overlay}",
    backdropFilter: "blur(3px)",
    zIndex: "49",
  },
})

const Panel = styled("aside", {
  base: {
    position: "fixed",
    inset: "0 0 0 auto",
    width: "min(440px, 100vw)",
    height: "100vh",
    background: "{colors.background}",
    borderLeft: "1px solid {colors.border}",
    boxShadow: "-24px 0 60px {colors.shadow}",
    display: "flex",
    flexDirection: "column",
    zIndex: "50",
    fontFamily: "{fonts.nativeFont}",
  },
})

const Header = styled("header", {
  base: {
    padding: "28px 28px 20px",
    borderBottom: "1px solid {colors.border}",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "{spacing.md}",
  },
})

const HeaderContent = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.xs}",
  },
})

const Title = styled("h2", {
  base: {
    margin: "0",
    fontSize: "20px",
    fontWeight: "600",
    color: "{colors.foreground}",
  },
})

const Subtitle = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "{colors.textMuted}",
    fontWeight: "600",
  },
})

const CloseBtn = styled("button", {
  base: {
    background: "{colors.elevated}",
    border: "none",
    borderRadius: "{radii.full}",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "{fontSizes.headline-md}",
    color: "{colors.foreground}",
    flexShrink: "0",
    "&:hover": {
      background: "{colors.elevated}",
    },
  },
})

const Body = styled("div", {
  base: {
    flex: "1",
    overflowY: "auto",
    padding: "20px 28px",
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
  },
})

const ProductRow = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "{radii.md}",
    background: "{colors.elevated}",
    border: "1px solid {colors.elevated}",
  },
})

const ProductName = styled("span", {
  base: {
    fontSize: "{fontSizes.body-sm}",
    fontWeight: "500",
    color: "{colors.foreground}",
    flex: "1",
    minWidth: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
})

const ProductCode = styled("span", {
  base: {
    fontSize: "10px",
    fontWeight: "700",
    background: "{colors.elevated}",
    padding: "2px 6px",
    borderRadius: "{radii.sm}",
    flexShrink: "0",
    letterSpacing: "0.03em",
  },
})

const CategoryBadge = styled("span", {
  base: {
    fontSize: "{fontSizes.label-md}",
    background: "{colors.infoBg}",
    color: "{colors.infoFg}",
    padding: "2px 8px",
    borderRadius: "{radii.full}",
    fontWeight: "600",
    flexShrink: "0",
  },
})

const EmptyMsg = styled("p", {
  base: {
    textAlign: "center",
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.body-sm}",
    padding: "{spacing.xl} 0",
  },
})

const LoadingMsg = styled("p", {
  base: {
    textAlign: "center",
    color: "{colors.textMuted}",
    fontSize: "{fontSizes.body-sm}",
    padding: "{spacing.xl} 0",
    animation: "pulse 1.5s ease-in-out infinite",
  },
})

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
