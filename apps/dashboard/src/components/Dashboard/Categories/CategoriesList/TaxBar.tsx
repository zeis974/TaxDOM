import type { Category } from "@taxdom/types"
import { styled } from "@/panda/jsx"
import {
  Container,
  LegendColor,
  LegendItem,
  TaxBarContainer,
  TaxLegend,
  TaxSegment,
  TotalTax,
} from "./TaxBar.styled"

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
      style={{ width: `${tax.percent}%`, backgroundColor: config.color }}
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
