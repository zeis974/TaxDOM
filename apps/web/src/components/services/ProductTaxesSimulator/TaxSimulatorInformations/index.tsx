"use client"
import type { TaxSimulatorFormLabel } from "@/components/services/ProductTaxesSimulator/types"

import * as m from "motion/react-m"
import { AnimatePresence } from "motion/react"
import Link from "next/link"
import { styled } from "@/panda/jsx"

import { useTheme } from "@wrksz/themes/client"

import CobeGlobe from "@/components/Misc/CobeGlobe"
import TaxSimulatorResult from "@/components/services/ProductTaxesSimulator/TaxSimulatorResult"

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

interface TaxSimulatorInformationsProps {
  focusInput: TaxSimulatorFormLabel | null
  selectedCountry: string | null
  selectedTerritory: string | null
  hasResult: boolean
  result: {
    taxes?: { tva: number; om: number; omr: number }
    product?: string
    errors?: { message: string }[]
  } | null
}

export default function TaxSimulatorInformations({
  focusInput,
  selectedCountry,
  selectedTerritory,
  hasResult,
  result,
}: TaxSimulatorInformationsProps) {
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
        {hasResult ? <TaxSimulatorResult result={result} /> : layers}
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

const Container = styled(m.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 20px;
  font-family: token(fonts.nativeFont);
  flex-direction: column;
  height: inherit;

  & > div {
    position: relative;

    & p {
      margin: 10px 0;
    }

    & p:last-child {
      margin: 20px 0;
    }
  }
`

const Underline = styled.span`
  text-decoration: underline dotted;
  text-underline-offset: 3px;
  cursor: pointer;
`
const Wrapper = styled.div`
  max-width: 85%;
  margin: 0 auto;

  & > p {
    max-width: 600px;
  }
`
