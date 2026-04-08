import { styled } from "@/styled-system/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const TaxBarContainer = styled.div`
  display: flex;
  height: 14px;
  border-radius: 10px;
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
    border-radius: 10px;
  }

  &::after {
    content: attr(data-percent) "%";
    position: absolute;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    background: rgba(255, 255, 255, 0.95);
    padding: 2px 6px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  color: #6b7280;
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
  color: token(colors.primary);
  font-size: 0.8rem;
  padding: 4px 8px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`
