import type { Route } from "next"
import type { JSX } from "react"
import {
  CategoriesToolIcon,
  CompareToolIcon,
  OriginsToolIcon,
  ParcelToolIcon,
  RatesToolIcon,
  TerritoriesToolIcon,
} from "@/components/Icons"
import type { IllustrationKind } from "./MegaMenu/Illustration"
import { ToolAccent } from "./ToolAccent.styled"

export type Tool = {
  name: string
  // Tile label in the mobile menu
  shortName: string
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

export const tools: Tool[] = [
  {
    name: "Rechercher les taux",
    shortName: "Taux",
    summary: "Les taxes applicables à un produit",
    description:
      "Trouve l'octroi de mer, l'OMR et la TVA applicables à un produit selon son origine.",
    icon: (
      <ToolAccent>
        <RatesToolIcon />
      </ToolAccent>
    ),
    slug: "/",
    visual: { kind: "rates", title: "Taux applicables" },
  },
  {
    name: "Simuler le coût d'un colis",
    shortName: "Colis",
    summary: "Les taxes et frais d'un envoi",
    description: "Estime les taxes et frais à payer sur un colis de plusieurs produits.",
    icon: (
      <ToolAccent data-variant="orange">
        <ParcelToolIcon />
      </ToolAccent>
    ),
    slug: "/simulator",
    visual: { kind: "parcel", title: "Simulation de colis" },
  },
  {
    name: "Comparer les produits",
    shortName: "Comparer",
    summary: "Les taux de plusieurs produits",
    description: "Met côte à côte les taux de plusieurs produits.",
    icon: (
      <ToolAccent data-variant="violet">
        <CompareToolIcon />
      </ToolAccent>
    ),
    visual: { kind: "compare", title: "Comparaison" },
  },
  {
    name: "Suivre les origines",
    shortName: "Origines",
    summary: "La provenance des importations",
    description: "Trace l'origine des produits importés.",
    icon: (
      <ToolAccent data-variant="green">
        <OriginsToolIcon />
      </ToolAccent>
    ),
    visual: { kind: "origins", title: "Origines" },
  },
  {
    name: "Explorer les territoires",
    shortName: "Territoires",
    summary: "Les taxes par territoire",
    description: "Visualise les taxes d'un produit dans chaque territoire.",
    icon: (
      <ToolAccent data-variant="cyan">
        <TerritoriesToolIcon />
      </ToolAccent>
    ),
    visual: { kind: "territories", title: "Territoires" },
  },
  {
    name: "Parcourir les catégories",
    shortName: "Catégories",
    summary: "Les produits par catégorie",
    description: "Filtre les produits par catégorie.",
    icon: (
      <ToolAccent data-variant="pink">
        <CategoriesToolIcon />
      </ToolAccent>
    ),
    visual: { kind: "categories", title: "Catégories" },
  },
]
