"use client"

import { useState } from "react"

import type { ProductTaxesSimulatorResult } from "@taxdom/types"

import {
  Container,
  Content,
  Line,
  PriceCalculator,
  RateCard,
  RateContainer,
  ResetButton,
  TaxeCard,
} from "./TaxSimulatorResult.styled"

interface TaxSimulatorResultProps {
  result: ProductTaxesSimulatorResult | null
  onReset: () => void
}

export default function TaxSimulatorResult({ result, onReset }: TaxSimulatorResultProps) {
  const [price, setPrice] = useState(0)

  if (!result?.taxes) {
    return "Aucun produit correspondant"
  }

  const {
    product,
    taxes: { tva, om, omr },
  } = result
  const total = tva + om + omr
  const calculatedPrice = price * (total / 100)

  return (
    <Container>
      <Content>
        <span>TaxDOM</span>
        <h1>
          Taux pour
          <br />
          <span>{product}</span>
        </h1>
        <p>Taux de taxe pouvant être appliquées au produit</p>
        <ResetButton onClick={onReset}>Nouvelle recherche</ResetButton>
      </Content>
      <TaxeCard>
        <RateContainer data-total={total}>
          <h5>Taux de taxes</h5>
          <div>
            <RateCard>
              <span>{tva} %</span>
              <span>TVA</span>
            </RateCard>
            <RateCard>
              <span>{om} %</span>
              <span>OM</span>
            </RateCard>
            <RateCard>
              <span>{omr} %</span>
              <span>OMR</span>
            </RateCard>
          </div>
        </RateContainer>
        <Line />
        <PriceCalculator>
          <h5>Prix en € (HT)</h5>
          <div>
            <input
              type="number"
              placeholder="100"
              onChange={(e) => setPrice(e.target.valueAsNumber)}
            />
            <RateCard>
              <span>
                {Number.isNaN(calculatedPrice) || calculatedPrice === 0
                  ? 0
                  : calculatedPrice.toFixed(2)}
                €
              </span>
              <span>à payer</span>
            </RateCard>
          </div>
        </PriceCalculator>
      </TaxeCard>
    </Container>
  )
}
