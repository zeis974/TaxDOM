import { AnimatePresence, easeIn, easeOut } from "motion/react"
import type { Route } from "next"
import Link from "next/link"
import { type JSX, useState } from "react"
import {
  CategoriesIcon,
  ExternalLinkIcon,
  OriginsIcon,
  ParcelIcon,
  ProductsIcon,
  TaxIcon,
  TerritoriesIcon,
} from "@/components/Icons"
import {
  Body,
  Card,
  CardDescription,
  CardIcon,
  CardTitle,
  CardTitleIcon,
  Grid,
  Panel,
  PromoContent,
  PromoName,
  PromoPanel,
} from "./MegaMenu.styled"

type Tools = {
  name: string
  description: string
  icon: JSX.Element
  slug?: Route
  disabled?: boolean
}

const tools: Tools[] = [
  {
    name: "Rechercher les taux",
    description: "Affiche les taux de taxes applicables à un produit",
    icon: <TaxIcon />,
    slug: "/",
  },
  {
    name: "Simuler le coût d'un colis",
    description: "Estime les taxes applicables à un colis",
    icon: <ParcelIcon />,
    slug: "/simulator",
  },
  {
    name: "Comparer les produits",
    description: "Compare les taux entre plusieurs produits",
    icon: <ProductsIcon />,
    disabled: true,
  },
  {
    name: "Suivre les origines",
    description: "Trace l'origine des produits importés",
    icon: <OriginsIcon />,
    disabled: true,
  },
  {
    name: "Explorer les territoires",
    description: "Visualise les taxes par territoire",
    icon: <TerritoriesIcon />,
    disabled: true,
  },
  {
    name: "Parcourir les catégories",
    description: "Filtre les produits par catégorie",
    icon: <CategoriesIcon />,
    disabled: true,
  },
]

export default function MegaMenu({ close }: { close: () => void }) {
  const [activeTool, setActiveTool] = useState(tools[0])

  return (
    <Panel
      key="mega-menu"
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -8, opacity: 0, transition: { duration: 0.15, ease: easeIn } }}
      transition={{ duration: 0.18, ease: easeOut }}
    >
      <Body>
        <Grid>
          {tools.map((tool) => {
            const active = activeTool === tool
            const card = (
              <Card
                key={tool.name}
                aria-disabled={tool.disabled || undefined}
                data-active={!tool.disabled && active}
                onMouseEnter={tool.disabled ? undefined : () => setActiveTool(tool)}
              >
                <CardIcon>{tool.icon}</CardIcon>
                <div>
                  <CardTitle>
                    {tool.name}
                    <CardTitleIcon data-active={!tool.disabled && active}>
                      <ExternalLinkIcon />
                    </CardTitleIcon>
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
              </Card>
            )

            return tool.disabled ? (
              <div key={tool.name}>{card}</div>
            ) : (
              <Link key={tool.name} href={tool.slug as Route} onClick={close}>
                {card}
              </Link>
            )
          })}
        </Grid>
        <PromoPanel>
          <AnimatePresence initial={false} mode="popLayout">
            <PromoContent
              key={activeTool.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: easeOut }}
            >
              <div>{activeTool.icon}</div>
              <PromoName>{activeTool.name}</PromoName>
            </PromoContent>
          </AnimatePresence>
        </PromoPanel>
      </Body>
    </Panel>
  )
}
