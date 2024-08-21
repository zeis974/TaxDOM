import dynamic from "next/dynamic"
import { useState } from "react"

import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

import { DownloadIcon, ShareIcon } from "@/components/Icons"

import {
  ActionBar,
  Container,
  Content,
  ErrorText,
  Line,
  PriceCalculator,
  RateCard,
  RateContainer,
  TaxeCard,
} from "./TaxSimulatorResult.styled"

const Tooltip = dynamic(() => import("@/lib/Tooltip"), {
  ssr: false,
})

export default function TaxSimulatorResult() {
  const [price, setPrice] = useState(0)
  const result = useTaxSimulatorStore((s) => s.result)

  console.log(result)

  if (result?.tva) {
    const { product, tva, om, omr } = result
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
          <p>Taux de taxe maximum pouvant être appliquées au produit</p>
          <ActionBar>
            <div id="share-tooltip">
              <ShareIcon />
            </div>
            <Tooltip content="Partager" anchor="share-tooltip" />
            <div id="download-tooltip">
              <DownloadIcon />
            </div>
            <Tooltip content="Sauvegarder" anchor="download-tooltip" />
          </ActionBar>
        </Content>
        <TaxeCard>
          <RateContainer>
            <h5>Taux de taxes (détaillés)</h5>
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
          <PriceCalculator data-total={total}>
            <h5>Prix en € (HT)</h5>
            <div>
              <input
                type="number"
                placeholder="100"
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
              <RateCard>
                <span>
                  {Number.isNaN(calculatedPrice)
                    ? 0
                    : calculatedPrice === 0
                      ? 0
                      : calculatedPrice.toFixed(2)}
                  €
                </span>
                <span>à payer</span>
              </RateCard>
            </div>
          </PriceCalculator>
          <ErrorText>Signaler une erreur</ErrorText>
        </TaxeCard>
      </Container>
    )
  }

  return "Aucun produit correspondant"
}
