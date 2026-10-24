import { AnimatePresence, easeIn, easeOut } from "motion/react"
import type { Route } from "next"
import Link from "next/link"
import { type JSX, useState } from "react"
import {
  ArrowRightIcon,
  CategoriesToolIcon,
  CompareToolIcon,
  OriginsToolIcon,
  ParcelToolIcon,
  RatesToolIcon,
  TerritoriesToolIcon,
} from "@/components/Icons"
import Illustration, { type IllustrationKind } from "./Illustration"
import {
  Badge,
  List,
  Panel,
  Preview,
  PreviewContent,
  PreviewDescription,
  PreviewHeader,
  PreviewName,
  ToolArrow,
  ToolIcon,
  ToolName,
  ToolRow,
  ToolSummary,
} from "./MegaMenu.styled"

type Tool = {
  name: string
  summary: string
  description: string
  icon: JSX.Element
  // Upcoming tools have no page yet
  slug?: Route
  visual: {
    kind: IllustrationKind
    title: string
  }
}

const tools: Tool[] = [
  {
    name: "Rechercher les taux",
    summary: "Les taxes applicables à un produit",
    description:
      "Trouve l'octroi de mer, l'OMR et la TVA applicables à un produit selon son origine.",
    icon: <RatesToolIcon />,
    slug: "/",
    visual: { kind: "rates", title: "Taux applicables" },
  },
  {
    name: "Simuler le coût d'un colis",
    summary: "Les taxes et frais d'un envoi",
    description: "Estime les taxes et frais à payer sur un colis de plusieurs produits.",
    icon: <ParcelToolIcon />,
    slug: "/simulator",
    visual: { kind: "parcel", title: "Simulation de colis" },
  },
  {
    name: "Comparer les produits",
    summary: "Les taux de plusieurs produits",
    description: "Met côte à côte les taux de plusieurs produits.",
    icon: <CompareToolIcon />,
    visual: { kind: "compare", title: "Comparaison" },
  },
  {
    name: "Suivre les origines",
    summary: "La provenance des importations",
    description: "Trace l'origine des produits importés.",
    icon: <OriginsToolIcon />,
    visual: { kind: "origins", title: "Origines" },
  },
  {
    name: "Explorer les territoires",
    summary: "Les taxes par territoire",
    description: "Visualise les taxes d'un produit dans chaque territoire.",
    icon: <TerritoriesToolIcon />,
    visual: { kind: "territories", title: "Territoires" },
  },
  {
    name: "Parcourir les catégories",
    summary: "Les produits par catégorie",
    description: "Filtre les produits par catégorie.",
    icon: <CategoriesToolIcon />,
    visual: { kind: "categories", title: "Catégories" },
  },
]

export default function MegaMenu({ close }: { close: () => void }) {
  const [active, setActive] = useState(tools[0])

  return (
    <Panel
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -8, opacity: 0, transition: { duration: 0.15, ease: easeIn } }}
      transition={{ duration: 0.18, ease: easeOut }}
    >
      <List>
        {tools.map((tool) => {
          const content = (
            <>
              <ToolIcon>{tool.icon}</ToolIcon>
              <div>
                <ToolName>{tool.name}</ToolName>
                <ToolSummary>{tool.summary}</ToolSummary>
              </div>
              {tool.slug ? (
                <ToolArrow>
                  <ArrowRightIcon />
                </ToolArrow>
              ) : (
                <Badge>Bientôt</Badge>
              )}
            </>
          )

          return (
            <ToolRow key={tool.name} data-active={active === tool}>
              {tool.slug ? (
                <Link
                  href={tool.slug}
                  onClick={close}
                  onMouseEnter={() => setActive(tool)}
                  onFocus={() => setActive(tool)}
                >
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-disabled="true"
                  onMouseEnter={() => setActive(tool)}
                  onFocus={() => setActive(tool)}
                >
                  {content}
                </button>
              )}
            </ToolRow>
          )
        })}
      </List>
      <Preview>
        <AnimatePresence initial={false} mode="popLayout">
          <PreviewContent
            key={active.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.08, ease: easeIn } }}
            transition={{ duration: 0.2, ease: easeOut }}
          >
            <PreviewHeader>
              <PreviewName>{active.name}</PreviewName>
              {!active.slug && <Badge>Bientôt</Badge>}
            </PreviewHeader>
            <PreviewDescription>{active.description}</PreviewDescription>
            <Illustration
              kind={active.visual.kind}
              title={active.visual.title}
              icon={active.icon}
            />
          </PreviewContent>
        </AnimatePresence>
      </Preview>
    </Panel>
  )
}
