import { styled } from "@/panda/jsx"
import type { Category } from "@taxdom/types"

const TAX_CONFIG = {
  TVA: { color: "#3B82F6", darkColor: "#2563EB", label: "TVA" },
  OM: { color: "#10B981", darkColor: "#059669", label: "OM" },
  OMR: { color: "#F59E0B", darkColor: "#D97706", label: "OMR" },
} as const

type TaxType = keyof typeof TAX_CONFIG

interface TaxData {
  type: TaxType
  value: number
  percent: number
}

const calculateTaxData = (taxes: Category["taxes"]): TaxData[] => {
  if (!taxes) return []

  const { tva, om, omr } = taxes
  const total = tva + om + omr

  if (total === 0) return []

  return [
    { type: "TVA" as const, value: tva, percent: (tva / total) * 100 },
    { type: "OM" as const, value: om, percent: (om / total) * 100 },
    { type: "OMR" as const, value: omr, percent: (omr / total) * 100 },
  ].filter((tax) => tax.value > 0)
}

const TaxSegmentComponent = ({ tax }: { tax: TaxData }) => {
  const config = TAX_CONFIG[tax.type]

  return (
    <TaxSegment
      data-percent={tax.percent.toFixed(1)}
      style={{
        width: `${tax.percent}%`,
        backgroundColor: config.color,
      }}
      title={`${config.label}: ${tax.value}%`}
    />
  )
}

const LegendItemComponent = ({ tax }: { tax: TaxData }) => {
  const config = TAX_CONFIG[tax.type]

  return (
    <LegendItem>
      <LegendColor style={{ backgroundColor: config.color }} />
      <span>
        {config.label} {tax.value}%
      </span>
    </LegendItem>
  )
}

export default function TaxBar({ taxes }: { taxes: Category["taxes"] }) {
  if (!taxes) return null

  const taxData = calculateTaxData(taxes)
  if (taxData.length === 0) return null

  const total = taxData.reduce((sum, tax) => sum + tax.value, 0)

  return (
    <Container>
      <TaxBarContainer>
        {taxData.map((tax) => (
          <TaxSegmentComponent key={tax.type} tax={tax} />
        ))}
      </TaxBarContainer>
      <TaxLegend>
        {taxData.map((tax) => (
          <LegendItemComponent key={tax.type} tax={tax} />
        ))}
        <TotalTax>Total: {total}%</TotalTax>
      </TaxLegend>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const TaxBarContainer = styled.div`
  display: flex;
  height: 14px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`

const TaxSegment = styled.div`
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

const TaxLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: #6b7280;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
`

const LegendColor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
`

const TotalTax = styled.span`
  margin-left: auto;
  font-weight: 700;
  color: token(colors.primary);
  font-size: 0.8rem;
  padding: 4px 8px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`
