"use client"

import type { ProductTaxesSimulatorResult } from "@taxdom/types"

import { useTheme } from "@wrksz/themes/client"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import Link from "next/link"

import CobeGlobe from "@/components/Misc/CobeGlobe"
import TaxSimulatorResult from "@/components/services/ProductTaxesSimulator/TaxSimulatorResult"
import type { TaxSimulatorFormLabel } from "@/components/services/ProductTaxesSimulator/types"

import { Container, Underline, Wrapper } from "./ProductTaxesSimulatorOverlay.styled"

const ProductLayer = () => {
  return (
    <m.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ fontSize: "3rem", fontWeight: 700 }}
    >
      PRODUCTS
    </m.h1>
  )
}

function GlobeLayer({
  selectedCountry,
  selectedTerritory,
  focusInput,
}: {
  selectedCountry: string | null
  selectedTerritory: string | null
  focusInput: TaxSimulatorFormLabel | null
}) {
  const { resolvedTheme } = useTheme()

  const showArc = focusInput === "territory" && !!selectedCountry
  const cameraTarget = focusInput === "territory" ? selectedTerritory : undefined

  return (
    <CobeGlobe
      origin={selectedCountry}
      cameraTarget={cameraTarget}
      showArcToReunion={showArc}
      dark={resolvedTheme === "dark"}
    />
  )
}

interface ProductTaxesSimulatorOverlayProps {
  focusInput: TaxSimulatorFormLabel | null
  selectedCountry: string | null
  selectedTerritory: string | null
  hasResult: boolean
  result: ProductTaxesSimulatorResult | null
  onReset: () => void
}

export default function ProductTaxesSimulatorOverlay({
  focusInput,
  selectedCountry,
  selectedTerritory,
  hasResult,
  result,
  onReset,
}: ProductTaxesSimulatorOverlayProps) {
  const layerMap: Partial<Record<TaxSimulatorFormLabel, React.JSX.Element>> = {
    product: <ProductLayer />,
    territory: (
      <GlobeLayer
        focusInput={focusInput}
        selectedCountry={selectedCountry}
        selectedTerritory={selectedTerritory}
      />
    ),
    origin: (
      <GlobeLayer
        focusInput={focusInput}
        selectedCountry={selectedCountry}
        selectedTerritory={selectedTerritory}
      />
    ),
  }

  const layers = (focusInput && layerMap[focusInput]) ?? <IntroLayer />

  return (
    <AnimatePresence initial={false} mode="wait">
      <Container
        layoutId="fade"
        key={focusInput === "product" ? "product" : focusInput ? "globe" : "intro"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {hasResult ? <TaxSimulatorResult result={result} onReset={onReset} /> : layers}
      </Container>
    </AnimatePresence>
  )
}

const IntroLayer = () => {
  return (
    <div>
      <h1>Rechercher les taux</h1>
      <Wrapper>
        <p>
          Cet outil permet de trouver les <Underline>taux de taxes</Underline> applicables à un
          produit. Il suffit d&apos;entrer le nom du produit recherché, tout au long du processus,
          vous serez guidé pour remplir les informations nécessaires.
        </p>
        <p>
          Vous souhaitez calculer l&apos;ensemble des coûts d&apos;un colis ?{" "}
          <Link href="/simulator">C&apos;est par ici !</Link>
        </p>
      </Wrapper>
    </div>
  )
}
