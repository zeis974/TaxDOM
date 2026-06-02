import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useVirtualizer } from "@tanstack/react-virtual"
import type React from "react"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { useNomenclatureSearch } from "@/hooks/useNomenclatureSearch"
import { Route } from "@/routes/_dashboard-layout/customs-tree"
import {
  ChapterBadge,
  ChapterCode,
  ChapterDescription,
  ChapterItem,
  ChapterList,
  ChapterNum,
  ChapterPanel,
  ChapterPanelHeader,
  ChapterPanelTitle,
  ChapterSearchInput,
  EmptyIcon,
  EmptyState,
  ErrorRow,
  HeaderActions,
  HeaderInfo,
  HeaderText,
  PageLayout,
  ProgressBar,
  ProgressFill,
  SearchIcon,
  SearchInput,
  SearchWrapper,
  SuggestionCode,
  SuggestionDescription,
  SuggestionItem,
  SuggestionList,
  SyncButton,
  SyncProgress,
  TreeBody,
  TreePanel,
  TreePanelHeader,
  TreeSubtitle,
  TreeTitle,
} from "./CustomsTree.styled"
import { formatHsCode, toSentenceCase } from "./format"
import ProductsDrawer from "./ProductsDrawer"
import { ChapterListSkeleton, HeaderSkeleton, TreeSkeleton } from "./Skeletons"
import type { NomenclatureNode } from "./TreeNode"
import { buildAncestorSet, flattenTree, TreeRow } from "./TreeNode"

const API_BASE =
  (import.meta as { env: Record<string, string> }).env.VITE_API_URL || "http://localhost:3333"

type ChapterSummary = {
  chapter: number
  description: string
  productCount: number
}

async function fetchChapters(): Promise<ChapterSummary[]> {
  const res = await fetch(`${API_BASE}/v1/admin/customs-nomenclatures/chapters`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  })
  if (!res.ok) throw new Error("Erreur chargement chapitres")
  const json = await res.json()
  return json.data ?? []
}

async function fetchTree(chapter: number): Promise<NomenclatureNode> {
  const res = await fetch(`${API_BASE}/v1/admin/customs-nomenclatures/tree?chapter=${chapter}`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  })
  if (!res.ok) throw new Error(`Erreur chargement chapitre ${chapter}`)
  const json = await res.json()
  return json.data
}

async function triggerSync(): Promise<{ runId: string }> {
  const res = await fetch(`${API_BASE}/v1/admin/customs-nomenclatures/sync`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  })
  if (!res.ok) throw new Error("Erreur déclenchement sync")
  return res.json()
}

type SyncProgressState = { chapter: number; total: number }

function useSyncProgress() {
  const [progress, setProgress] = useState<SyncProgressState | null>(null)

  const startSSE = (runId: string) => {
    const url = `${API_BASE}/v1/admin/customs-nomenclatures/sync/${runId}/stream`
    const evtSource = new EventSource(url, { withCredentials: true })

    setProgress({ chapter: 0, total: 99 })

    evtSource.addEventListener("progress", (e) => {
      const data = JSON.parse(e.data) as { chapter?: number }
      setProgress({ chapter: data.chapter ?? 0, total: 99 })
    })

    evtSource.addEventListener("done", (e) => {
      const data = JSON.parse(e.data) as { status: string; rowsImported?: number }
      setProgress(null)
      evtSource.close()
      if (data.status === "ok") {
        toast.success(`Synchronisation terminée — ${data.rowsImported ?? "?"} lignes importées`)
      } else {
        toast.error("Synchronisation terminée avec des erreurs")
      }
    })

    evtSource.onerror = () => {
      setProgress(null)
      evtSource.close()
      toast.error("Erreur lors du suivi de la synchronisation")
    }
  }

  return { progress, startSSE }
}

// ── Suggestion dropdown (fixed positioning to escape overflow: hidden) ────────

type Suggestion = { code: string; description: string; chapter: number }

interface SuggestionDropdownProps {
  anchorRef: React.RefObject<HTMLDivElement | null>
  suggestions: Suggestion[]
  onSelect: (code: string, chapter: number) => void
  onClose: () => void
}

function SuggestionDropdown({
  anchorRef,
  suggestions,
  onSelect,
  onClose,
}: SuggestionDropdownProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  // Keep the fixed dropdown anchored to the search input on scroll / resize.
  useLayoutEffect(() => {
    const el = anchorRef.current
    if (!el) return
    const reposition = () => {
      const rect = el.getBoundingClientRect()
      setStyle({ top: rect.bottom + 6, right: window.innerWidth - rect.right })
    }
    reposition()
    window.addEventListener("scroll", reposition, true)
    window.addEventListener("resize", reposition)
    return () => {
      window.removeEventListener("scroll", reposition, true)
      window.removeEventListener("resize", reposition)
    }
  }, [anchorRef])

  // Close when clicking outside the input or the dropdown.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (anchorRef.current?.contains(target) || listRef.current?.contains(target)) return
      onClose()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [anchorRef, onClose])

  if (suggestions.length === 0) return null

  return (
    <SuggestionList ref={listRef} style={style}>
      {suggestions.map((s) => (
        <SuggestionItem key={s.code} type="button" onClick={() => onSelect(s.code, s.chapter)}>
          <SuggestionCode>{formatHsCode(s.code)}</SuggestionCode>
          <SuggestionDescription title={s.description}>{s.description}</SuggestionDescription>
        </SuggestionItem>
      ))}
    </SuggestionList>
  )
}

export default function CustomsTree() {
  const queryClient = useQueryClient()
  const navigate = Route.useNavigate()
  const { chapter: selectedChapter, code: highlightedCode } = Route.useSearch()
  const [chapterSearch, setChapterSearch] = useState("")
  const [codeSearch, setCodeSearch] = useState("")
  const [drawerNode, setDrawerNode] = useState<NomenclatureNode | null>(null)
  const searchAnchorRef = useRef<HTMLDivElement>(null)
  const { progress, startSSE } = useSyncProgress()

  const { suggestions: codeSuggestions } = useNomenclatureSearch(codeSearch)

  const { data: chapters = [], isLoading: chaptersLoading } = useQuery<ChapterSummary[]>({
    queryKey: ["customs-nomenclatures", "chapters"],
    queryFn: fetchChapters,
    staleTime: 1000 * 60 * 10,
  })

  const {
    data: treeData,
    isLoading: treeLoading,
    error: treeError,
  } = useQuery<NomenclatureNode>({
    queryKey: ["customs-nomenclatures", "tree", selectedChapter],
    queryFn: () => fetchTree(selectedChapter!),
    enabled: selectedChapter !== undefined,
    staleTime: 1000 * 60 * 5,
  })

  const treeBodyRef = useRef<HTMLDivElement>(null)
  const [expandedCodes, setExpandedCodes] = useState<ReadonlySet<string>>(new Set())

  // Expand the path down to a deep-linked code (?code=…) so it is visible.
  // No per-chapter reset is needed: HS codes are unique per chapter, so any
  // leftover expanded codes from another chapter are simply ignored by flattenTree.
  useEffect(() => {
    if (!highlightedCode || !treeData) return
    const ancestors = buildAncestorSet(treeData, highlightedCode)
    if (!ancestors) return
    setExpandedCodes((prev) => {
      const next = new Set(prev)
      for (const code of ancestors) next.add(code)
      return next
    })
  }, [highlightedCode, treeData])

  const toggle = useCallback((code: string) => {
    setExpandedCodes((prev) => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }, [])

  const flatRows = useMemo(
    () => (treeData ? flattenTree(treeData, expandedCodes) : []),
    [treeData, expandedCodes],
  )

  const rowVirtualizer = useVirtualizer({
    count: flatRows.length,
    getScrollElement: () => treeBodyRef.current,
    estimateSize: () => 32,
    overscan: 12,
    getItemKey: (index) => flatRows[index].node.code,
  })

  // Scroll the highlighted row into view once it is part of the flattened list.
  useEffect(() => {
    if (!highlightedCode || flatRows.length === 0) return
    const index = flatRows.findIndex((r) => r.node.code === highlightedCode)
    if (index >= 0) rowVirtualizer.scrollToIndex(index, { align: "center" })
  }, [highlightedCode, flatRows, rowVirtualizer])

  const syncMutation = useMutation({
    mutationFn: triggerSync,
    onSuccess: (data) => {
      startSSE(data.runId)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customs-nomenclatures"] })
    },
    onError: () => {
      toast.error("Impossible de lancer la synchronisation")
    },
  })

  const filteredChapters = chapterSearch.trim()
    ? chapters.filter(
        (c) =>
          c.description.toLowerCase().includes(chapterSearch.toLowerCase()) ||
          String(c.chapter).padStart(2, "0").includes(chapterSearch),
      )
    : chapters

  const selectedChapterMeta = chapters.find((c) => c.chapter === selectedChapter)

  const handleChapterSelect = (chapter: number) => {
    navigate({ search: { chapter, code: undefined } })
  }

  const handleNodeClick = useCallback((node: NomenclatureNode) => {
    if (node.productCount > 0) setDrawerNode(node)
  }, [])

  const handleCodeSuggestionSelect = (code: string, chapter: number) => {
    navigate({ search: { chapter, code } })
    setCodeSearch("")
  }

  return (
    <PageLayout>
      {/* ── Left: chapter list ──────────────────────────────── */}
      <ChapterPanel>
        <ChapterPanelHeader>
          <ChapterPanelTitle>Chapitres SH</ChapterPanelTitle>
          <ChapterSearchInput
            type="search"
            placeholder="Filtrer les chapitres..."
            value={chapterSearch}
            onChange={(e) => setChapterSearch(e.target.value)}
            aria-label="Filtrer les chapitres"
          />
        </ChapterPanelHeader>

        <ChapterList role="listbox" aria-label="Liste des chapitres SH">
          {chaptersLoading && <ChapterListSkeleton />}
          {!chaptersLoading && chapters.length === 0 && (
            <li style={{ padding: "12px 10px", fontSize: 13, color: "rgba(100,116,139,0.7)" }}>
              Aucune donnée — lancez une synchronisation RITA
            </li>
          )}
          {filteredChapters.map((c) => (
            <li key={c.chapter} role="option" aria-selected={selectedChapter === c.chapter}>
              <ChapterItem
                type="button"
                data-active={selectedChapter === c.chapter ? "true" : "false"}
                onClick={() => handleChapterSelect(c.chapter)}
              >
                <ChapterCode>{String(c.chapter).padStart(2, "0")}</ChapterCode>
                <ChapterDescription title={toSentenceCase(c.description)}>
                  {toSentenceCase(c.description) || "—"}
                </ChapterDescription>
                {c.productCount > 0 && <ChapterBadge>{c.productCount}</ChapterBadge>}
              </ChapterItem>
            </li>
          ))}
        </ChapterList>
      </ChapterPanel>

      {/* ── Right: tree view ────────────────────────────────── */}
      <TreePanel>
        <TreePanelHeader>
          {/* Left: chapter number + title/subtitle */}
          {selectedChapter && chaptersLoading ? (
            <HeaderSkeleton />
          ) : (
            <HeaderInfo>
              {selectedChapter && (
                <ChapterNum>{String(selectedChapter).padStart(2, "0")}</ChapterNum>
              )}
              <HeaderText>
                <TreeTitle>
                  {selectedChapter
                    ? toSentenceCase(
                        selectedChapterMeta?.description ??
                          `Chapitre ${String(selectedChapter).padStart(2, "0")}`,
                      )
                    : "Nomenclatures SH"}
                </TreeTitle>
                <TreeSubtitle>
                  {selectedChapter
                    ? selectedChapterMeta?.productCount
                      ? `${selectedChapterMeta.productCount} produit${selectedChapterMeta.productCount > 1 ? "s" : ""} référencé${selectedChapterMeta.productCount > 1 ? "s" : ""}`
                      : "Aucun produit référencé"
                    : "Sélectionnez un chapitre dans le panneau gauche"}
                </TreeSubtitle>
              </HeaderText>
            </HeaderInfo>
          )}

          {/* Right: search + sync */}
          <HeaderActions>
            {progress ? (
              <SyncProgress>
                <ProgressBar>
                  <ProgressFill
                    style={
                      {
                        "--progress-width": `${Math.round((progress.chapter / 99) * 100)}%`,
                      } as React.CSSProperties
                    }
                  />
                </ProgressBar>
                <span>{progress.chapter > 0 ? `${progress.chapter}/99` : "Démarrage…"}</span>
              </SyncProgress>
            ) : (
              <>
                <SearchWrapper ref={searchAnchorRef}>
                  <SearchIcon viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                    <path
                      d="M13 13l3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </SearchIcon>
                  <SearchInput
                    type="search"
                    placeholder="Rechercher un code SH…"
                    value={codeSearch}
                    onChange={(e) => setCodeSearch(e.target.value)}
                    aria-label="Rechercher un code SH"
                  />
                  {codeSearch.length >= 2 && (
                    <SuggestionDropdown
                      anchorRef={searchAnchorRef}
                      suggestions={codeSuggestions}
                      onSelect={handleCodeSuggestionSelect}
                      onClose={() => setCodeSearch("")}
                    />
                  )}
                </SearchWrapper>
                <SyncButton
                  type="button"
                  onClick={() => syncMutation.mutate()}
                  disabled={syncMutation.isPending}
                  aria-label="Synchroniser les nomenclatures depuis RITA"
                  title="Synchroniser RITA"
                >
                  <SyncIcon />
                </SyncButton>
              </>
            )}
          </HeaderActions>
        </TreePanelHeader>

        <TreeBody ref={treeBodyRef}>
          {!selectedChapter && (
            <EmptyState>
              <EmptyIcon>🌲</EmptyIcon>
              <p>
                Sélectionnez un chapitre dans le panneau gauche pour explorer l'arbre des
                nomenclatures douanières.
              </p>
            </EmptyState>
          )}
          {selectedChapter && treeLoading && <TreeSkeleton />}
          {selectedChapter && treeError && (
            <ErrorRow>
              Impossible de charger le chapitre {selectedChapter}. Les données RITA ne sont
              peut-être pas encore synchronisées — utilisez le bouton "Synchroniser RITA".
            </ErrorRow>
          )}
          {selectedChapter && treeData && (
            <div
              style={{ height: rowVirtualizer.getTotalSize(), position: "relative", width: "100%" }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                const row = flatRows[virtualItem.index]
                return (
                  <div
                    key={virtualItem.key}
                    data-index={virtualItem.index}
                    ref={rowVirtualizer.measureElement}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    <TreeRow
                      node={row.node}
                      depth={row.depth}
                      hasChildren={row.hasChildren}
                      expanded={row.expanded}
                      isHighlighted={row.node.code === highlightedCode}
                      onToggle={toggle}
                      onNodeClick={handleNodeClick}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </TreeBody>
      </TreePanel>

      {/* ── Drawer: products in branch ────────────────────── */}
      {drawerNode && <ProductsDrawer node={drawerNode} onClose={() => setDrawerNode(null)} />}
    </PageLayout>
  )
}

function SyncIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  )
}
