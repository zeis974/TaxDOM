import { styled } from "@/panda/jsx"

export const FilterWrapper = styled.div`
  position: relative;
  display: inline-flex;
`

export const FilterTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: token(spacing.sm);
  padding: 10px 16px;
  background: token(colors.elevated);
  font-weight: 600;
  border: 1px solid token(colors.border);
  cursor: pointer;
  border-radius: token(radii.md);
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  font-size: token(fontSizes.body-sm);
  transition: all 150ms ease;

  &[data-active="true"] {
    border-color: token(colors.primary);
    color: token(colors.primary);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }
`

export const FilterDot = styled.span`
  width: token(spacing.sm);
  height: token(spacing.sm);
  border-radius: token(radii.full);
  background: token(colors.primary);
  flex-shrink: 0;
`

export const FilterPopover = styled.div`
  position: absolute;
  top: calc(100% + token(spacing.sm));
  right: 0;
  z-index: 20;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: token(spacing.md);
  padding: token(spacing.md);
  background: token(colors.elevated);
  border: 1px solid token(colors.border);
  border-radius: token(radii.md);
  box-shadow: 0 8px 20px token(colors.shadow);
  animation: fadeIn 150ms ease-out;
`

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.sm);
`

export const FilterSectionLabel = styled.span`
  font-size: token(fontSizes.label-md);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: token(colors.textMuted);
`

export const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: token(spacing.xs);
`

export const FilterOption = styled.button`
  padding: token(spacing.xs) token(spacing.sm);
  background: transparent;
  border: 1px solid token(colors.border);
  border-radius: token(radii.sm);
  cursor: pointer;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);
  font-size: token(fontSizes.body-sm);
  transition: all 150ms ease;

  &:hover {
    border-color: token(colors.primary);
  }

  &[data-active="true"] {
    background: color-mix(in srgb, token(colors.primary) 12%, transparent);
    border-color: token(colors.primary);
    color: token(colors.primary);
    font-weight: 600;
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }
`
