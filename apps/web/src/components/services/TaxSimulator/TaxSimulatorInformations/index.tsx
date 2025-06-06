"use client"
import type { TaxSimulatorFormLabel } from "@/components/services/TaxSimulator/types"

import * as m from "motion/react-m"
import { AnimatePresence } from "motion/react"
import Link from "next/link"
import { styled } from "@/panda/jsx"

import { useTaxSimulatorStore } from "@/providers/TaxSimulatorStoreProvider"

import MapsIllustration from "@/components/Misc/MapsIllustration"
import TaxSimulatorResult from "@/components/services/TaxSimulator/TaxSimulatorResult"

const ProductLayer = () => {
  return (
    <div
      style={{
        width: 400,
        height: 400,
        backgroundImage: `url("/assets/BentoGrid.webp")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  )
}

const layerMap: Record<string, React.JSX.Element> = {
  product: <ProductLayer />,
  territory: <MapsIllustration />,
  origin: <MapsIllustration />,
}

export default function TaxSimulatorInformations() {
  const focusInput = useTaxSimulatorStore((s) => s.focusInput)
  const hasResult = useTaxSimulatorStore((s) => s.hasResult)

  const layers = layerMap[focusInput as TaxSimulatorFormLabel] ?? <IntroLayer />

  return (
    <AnimatePresence initial={false} mode="wait">
      <Container
        layoutId="fade"
        key={focusInput === "product" ? focusInput : null}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {layers !== null ? hasResult ? <TaxSimulatorResult /> : layers : <IntroLayer />}
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

  & > p  {
    max-width: 600px;
  }
`
