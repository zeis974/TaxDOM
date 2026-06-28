import { styled } from "@/panda/jsx"

export const FilterWrapper = styled.div`
  position: relative;
`

export const FilterTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: token(spacing.xs);
  padding: 8px 14px;
  border-radius: token(radii.md);
  font-size: token(fontSizes.body-sm);
  font-weight: 500;
  border: 1px solid token(colors.border);
  background: token(colors.background);
  color: token(colors.foreground);
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease, color 150ms ease;

  &:hover {
    background: token(colors.elevated);
  }

  &[data-active="true"] {
    border-color: token(colors.primary);
    color: token(colors.primary);
    background: color-mix(in srgb, token(colors.primary) 12%, transparent);
  }
`

export const FilterDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: token(radii.full);
  background: currentColor;
`

export const FilterPopover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 50;
  background: token(colors.background);
  border: 1px solid token(colors.border);
  border-radius: token(radii.lg);
  box-shadow: 0 8px 24px token(colors.shadow);
  padding: token(spacing.md);
  min-width: 210px;
  display: flex;
  flex-direction: column;
  gap: token(spacing.md);
`

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.xs);
`

export const FilterSectionLabel = styled.span`
  font-size: token(fontSizes.label-md);
  font-weight: 600;
  color: token(colors.textMuted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const FilterOptions = styled.div`
  display: flex;
  gap: token(spacing.xs);
  flex-wrap: wrap;
`

export const FilterOption = styled.button`
  padding: 4px 12px;
  border-radius: token(radii.full);
  font-size: token(fontSizes.label-md);
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: token(colors.elevated);
  color: token(colors.textMuted);
  transition: background 150ms ease, color 150ms ease;

  &:hover {
    background: color-mix(in srgb, token(colors.primary) 12%, token(colors.elevated));
    color: token(colors.foreground);
  }

  &[data-value="all"][data-active="true"] {
    background: token(colors.elevated);
    color: token(colors.foreground);
  }

  &[data-value="eu"][data-active="true"] {
    background: color-mix(in srgb, token(colors.primary) 12%, transparent);
    color: token(colors.primaryHover);
  }

  &[data-value="hors-eu"][data-active="true"] {
    background: token(colors.warningBg);
    color: token(colors.warningFg);
  }

  &[data-value="active"][data-active="true"] {
    background: token(colors.successBg);
    color: token(colors.successFg);
  }

  &[data-value="inactive"][data-active="true"] {
    background: token(colors.errorBg);
    color: token(colors.errorFg);
  }
`
