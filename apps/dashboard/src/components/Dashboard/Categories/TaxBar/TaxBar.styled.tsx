import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.sm);
  width: 100%;
`

export const TaxBarContainer = styled.div`
  display: flex;
  height: 14px;
  border-radius: token(radii.lg);
  overflow: hidden;
  position: relative;
`

export const TaxSegment = styled.div`
  height: 100%;
  position: relative;
  cursor: pointer;

  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
  &:only-child {
    border-radius: token(radii.lg);
  }

  &::after {
    content: attr(data-percent) "%";
    position: absolute;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    font-weight: 600;
    color: token(colors.background);
    background: token(colors.foreground);
    padding: 2px 6px;
    border-radius: token(radii.sm);
    box-shadow: 0 1px 3px token(colors.shadow);
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
  }

  &:hover::after {
    opacity: 1;
  }
`

export const TaxLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: token(colors.textMuted);
`

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
`

export const LegendColor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
`

export const TotalTax = styled.span`
  margin-left: auto;
  font-weight: 700;
  color: token(colors.foreground);
  font-size: 0.8rem;
  padding: 4px 8px;
  background: color-mix(in srgb, token(colors.primary) 12%, transparent);
  border-radius: token(radii.lg);
  border: 1px solid color-mix(in srgb, token(colors.primary) 25%, transparent);
`
