import type { JSX } from "react"
import {
  BackCard,
  Bar,
  Card,
  Chart,
  Column,
  Columns,
  Divider,
  Dot,
  Field,
  Header,
  Label,
  Line,
  Pillar,
  Route,
  Row,
  Scene,
  Tile,
  Tiles,
} from "./Illustration.styled"

export type IllustrationKind =
  | "rates"
  | "parcel"
  | "compare"
  | "origins"
  | "territories"
  | "categories"

const accents: Record<IllustrationKind, string> = {
  rates: "blue",
  parcel: "orange",
  compare: "violet",
  origins: "green",
  territories: "cyan",
  categories: "pink",
}

const compared = [
  { label: "Produit A", heights: ["md", "lg", "sm"] },
  { label: "Produit B", heights: ["sm", "md", "md"] },
]

// Mock screens only: they never show figures, so nothing reads as a real rate
function Body({ kind }: { kind: IllustrationKind }) {
  switch (kind) {
    case "rates":
      return (
        <>
          <Field>Rechercher un produit</Field>
          {["Octroi de mer", "OMR", "TVA"].map((label, i) => (
            <Row key={label}>
              <Label>{label}</Label>
              <Bar data-tone="accent" data-w={i === 1 ? "sm" : "md"} />
            </Row>
          ))}
        </>
      )
    case "parcel":
      return (
        <>
          {["Produits", "Transport", "Taxes"].map((label, i) => (
            <Row key={label}>
              <Label>{label}</Label>
              <Bar data-w={i === 1 ? "sm" : "md"} />
            </Row>
          ))}
          <Divider />
          <Row>
            <Label data-weight="bold">Total</Label>
            <Bar data-tone="accent" data-h="lg" />
          </Row>
        </>
      )
    case "compare":
      return (
        <Columns>
          {compared.map((product, i) => (
            <Column key={product.label}>
              <Label data-weight="bold">{product.label}</Label>
              <Chart>
                {product.heights.map((h, j) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars
                  <Pillar key={j} data-h={h} data-tone={i === 0 ? "accent" : undefined} />
                ))}
              </Chart>
            </Column>
          ))}
        </Columns>
      )
    case "origins":
      return [
        ["Chine", "La Réunion"],
        ["France", "Guadeloupe"],
        ["Brésil", "Guyane"],
      ].map(([from, to]) => (
        <Route key={from}>
          <Dot data-tone="neutral" />
          <Label>{from}</Label>
          <Line />
          <Label data-weight="bold">{to}</Label>
          <Dot />
        </Route>
      ))
    case "territories":
      return ["Guadeloupe", "Martinique", "Guyane", "La Réunion", "Mayotte"].map((label, i) => (
        <Row key={label}>
          <Route>
            <Dot />
            <Label>{label}</Label>
          </Route>
          <Bar data-w={i % 2 ? "sm" : "md"} />
        </Row>
      ))
    case "categories":
      return (
        <Tiles>
          {["Électronique", "Textile", "Alimentaire", "Beauté", "Maison", "Jouets"].map((label) => (
            <Tile key={label}>
              <Label>{label}</Label>
            </Tile>
          ))}
        </Tiles>
      )
  }
}

export default function Illustration({
  kind,
  title,
  icon,
}: {
  kind: IllustrationKind
  title: string
  icon: JSX.Element
}) {
  return (
    <Scene data-variant={accents[kind]} aria-hidden="true">
      <BackCard>
        <Bar data-w="md" />
        <Bar data-w="xl" />
        <Bar data-w="sm" />
      </BackCard>
      <Card>
        <Header>
          {icon}
          {title}
        </Header>
        <Body kind={kind} />
      </Card>
    </Scene>
  )
}
