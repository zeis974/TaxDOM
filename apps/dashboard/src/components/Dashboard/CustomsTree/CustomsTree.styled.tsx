import { styled } from "@/panda/jsx"

export const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  height: calc(100svh - 20px);
  gap: 10px;
  overflow: hidden;
  font-family: token(fonts.nativeFont);
`

export const ChapterPanel = styled.aside`
  background: token(colors.secondaryBackground);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid token(colors.darkGray);
`

export const ChapterPanelHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid token(colors.darkGray);
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
`

export const ChapterPanelTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: token(colors.primary);
  opacity: 0.7;
`

export const SearchInput = styled.input`
  background: token(colors.tertiaryBackground);
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px 12px 8px 32px;
  font-size: 13px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  outline: none;
  box-sizing: border-box;
  width: 220px;
  transition: border-color 120ms ease, width 200ms ease;
  &::placeholder {
    color: rgba(100, 116, 139, 0.5);
  }
  &:focus {
    border-color: rgba(14, 165, 233, 0.4);
    width: 260px;
  }
`

/* Chapter-panel search — full width, no left icon */
export const ChapterSearchInput = styled.input`
  width: 100%;
  background: token(colors.tertiaryBackground);
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  outline: none;
  box-sizing: border-box;
  &::placeholder {
    color: rgba(100, 116, 139, 0.6);
  }
  &:focus {
    border-color: rgba(14, 165, 233, 0.4);
  }
`

export const ChapterList = styled.ul`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ChapterItem = styled.button`
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 120ms ease;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);

  &:hover {
    background: token(colors.tertiaryBackground);
  }

  &[data-active="true"] {
    background: rgba(14, 165, 233, 0.12);
    color: #0ea5e9;
  }
`

export const ChapterCode = styled.span`
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  min-width: 24px;
  opacity: 0.6;
`

export const ChapterDescription = styled.span`
  font-size: 12px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
`

export const ChapterBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  background: rgba(14, 165, 233, 0.15);
  color: #0ea5e9;
  padding: 2px 7px;
  border-radius: 999px;
  flex-shrink: 0;
`

export const TreePanel = styled.main`
  background: token(colors.secondaryBackground);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid token(colors.darkGray);
`

export const TreePanelHeader = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid token(colors.darkGray);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
  min-width: 0;
`

/* Left: chapter number + text block */
export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
`

export const ChapterNum = styled.span`
  font-size: 28px;
  font-weight: 800;
  color: #0ea5e9;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  line-height: 1;
  flex-shrink: 0;
`

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

export const TreeTitle = styled.h2`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: token(colors.primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TreeSubtitle = styled.span`
  font-size: 12px;
  color: rgba(100, 116, 139, 0.6);
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/* Right: search + sync */
export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const SearchIcon = styled.svg`
  position: absolute;
  left: 10px;
  width: 14px;
  height: 14px;
  color: rgba(100, 116, 139, 0.5);
  pointer-events: none;
  flex-shrink: 0;
`

/* Keep TreePanelTitle as a stub for backwards compat — unused in new header */
export const TreePanelTitle = styled.div``

export const SyncButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  background: rgba(14, 165, 233, 0.1);
  color: #0ea5e9;
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: rgba(14, 165, 233, 0.2);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

export const SyncProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(100, 116, 139, 0.85);
`

export const ProgressBar = styled.div`
  position: relative;
  height: 4px;
  width: 120px;
  background: token(colors.tertiaryBackground);
  border-radius: 2px;
  overflow: hidden;
`

export const ProgressFill = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--progress-width, 0%);
  background: #0ea5e9;
  border-radius: 2px;
  transition: width 400ms ease;
`

export const TreeBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: rgba(100, 116, 139, 0.7);
  font-size: 14px;
  text-align: center;
  padding: 48px 32px;
`

export const EmptyIcon = styled.div`
  font-size: 48px;
  opacity: 0.4;
`

export const TreeNodeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 100ms ease;
  font-size: 13px;
  color: token(colors.primary);

  &:hover {
    background: token(colors.tertiaryBackground);
  }

  &[data-has-products="true"] {
    color: token(colors.primary);
    font-weight: 500;
  }

  &[data-highlighted="true"] {
    background: rgba(234, 179, 8, 0.15);
    outline: 1px solid rgba(234, 179, 8, 0.5);
    border-radius: 6px;
    animation: highlightPulse 1.2s ease-out forwards;
  }

  @keyframes highlightPulse {
    0%   { background: rgba(234, 179, 8, 0.35); }
    100% { background: rgba(234, 179, 8, 0.12); }
  }
`

export const NodeIndent = styled.div`
  flex-shrink: 0;
  width: var(--indent-width, 0px);
`

export const NodeToggle = styled.button`
  background: token(colors.tertiaryBackground);
  border: 1px solid token(colors.darkGray);
  padding: 0;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(100, 116, 139, 0.8);
  flex-shrink: 0;
  border-radius: 3px;
  transition: background 100ms ease, border-color 100ms ease, color 100ms ease;

  &:hover {
    background: rgba(14, 165, 233, 0.12);
    border-color: rgba(14, 165, 233, 0.4);
    color: #0ea5e9;
  }
`

export const NodeCode = styled.span`
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  background: token(colors.tertiaryBackground);
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
  letter-spacing: 0.02em;
`

export const NodeDescription = styled.span`
  flex: 1;
  line-height: 1.4;
`

export const NodeProductBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
  padding: 2px 8px;
  border-radius: 999px;
  flex-shrink: 0;
`

export const LoadingRow = styled.div`
  padding: 8px 12px;
  font-size: 13px;
  color: rgba(100, 116, 139, 0.6);
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`

export const ErrorRow = styled.div`
  padding: 12px 16px;
  font-size: 13px;
  color: #ef4444;
  background: #fee2e2;
  border-radius: 8px;
  margin: 8px 0;
`

export const SuggestionList = styled.div`
  position: fixed;
  z-index: 200;
  min-width: 340px;
  max-width: 480px;
  max-height: 260px;
  overflow-y: auto;
  background: token(colors.secondaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  font-family: token(fonts.nativeFont);
`

export const SuggestionItem = styled.button`
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 9px 14px;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: token(fonts.nativeFont);
  color: token(colors.primary);
  transition: background 100ms ease;

  &:first-child { border-radius: 10px 10px 0 0; }
  &:last-child  { border-radius: 0 0 10px 10px; }

  &:hover {
    background: token(colors.tertiaryBackground);
  }
`

// ── Skeleton ──────────────────────────────────────────────────────────────────

export const SkeletonRect = styled.span`
  display: block;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(148, 163, 184, 0.12) 25%,
    rgba(148, 163, 184, 0.38) 50%,
    rgba(148, 163, 184, 0.12) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
`

// ── Suggestions ───────────────────────────────────────────────────────────────

export const SuggestionCode = styled.span`
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  background: rgba(14, 165, 233, 0.12);
  color: #0ea5e9;
  padding: 2px 7px;
  border-radius: 4px;
  flex-shrink: 0;
  letter-spacing: 0.02em;
`

export const SuggestionDescription = styled.span`
  font-size: 12px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: token(colors.primary);
  opacity: 0.8;
`
