import type { JSX } from "react"
import {
  BackCard,
  Bar,
  Card,
  Chart,
  ChartRow,
  Chip,
  Chips,
  Column,
  Columns,
  Divider,
  Dot,
  Field,
  Header,
  Item,
  Label,
  Line,
  Pillar,
  Route,
  Row,
  Scene,
  Thumb,
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
          <Field>Smartphone</Field>
          <Chips>
            <Chip>France</Chip>→<Chip data-tone="accent">La Réunion</Chip>
          </Chips>
          {["Octroi de mer", "OMR", "TVA"].map((label, i) => (
            <Row key={label}>
              <Label>{label}</Label>
              <Bar data-tone="accent" data-w={["md", "sm", "xl"][i]} />
            </Row>
          ))}
        </>
      )
    case "parcel":
      return (
        <>
          {["Casque audio", "Baskets", "Livres"].map((label, i) => (
            <Row key={label}>
              <Item>
                <Thumb />
                <Label>{label}</Label>
              </Item>
              <Bar data-w={i === 1 ? "sm" : "md"} />
            </Row>
          ))}
          <Row>
            <Label data-tone="muted">Transport et taxes</Label>
            <Bar data-w="sm" />
          </Row>
          <Divider />
          <Row>
            <Label data-weight="bold">Total</Label>
            <Bar data-tone="accent" data-w="xl" data-h="lg" />
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
              <Bar data-w={i === 0 ? "md" : "sm"} />
            </Column>
          ))}
        </Columns>
      )
    case "origins":
      return [
        ["Chine", "La Réunion"],
        ["France", "Guadeloupe"],
        ["Brésil", "Guyane"],
        ["Inde", "Mayotte"],
        ["Italie", "Martinique"],
      ].map(([from, to]) => (
        <Route key={from}>
          <Dot data-tone="neutral" />
          <Label data-tone="muted">{from}</Label>
          <Line />
          <Label data-weight="bold">{to}</Label>
          <Dot />
        </Route>
      ))
    case "territories":
      return ["Guadeloupe", "Martinique", "Guyane", "La Réunion", "Mayotte"].map((label, i) => (
        <ChartRow key={label}>
          <Label>{label}</Label>
          <Bar data-tone="accent" data-w={["xl", "md", "xl", "md", "sm"][i]} />
        </ChartRow>
      ))
    case "categories":
      return (
        <Tiles>
          {[
            "Électronique",
            "Textile",
            "Alimentaire",
            "Beauté",
            "Maison",
            "Jouets",
            "Sport",
            "Auto",
            "Jardin",
          ].map((label) => (
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
        {["xl", "md", "xl"].map((w, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars
          <Row key={i}>
            <Bar data-w="full" />
            <Bar data-w={w} />
          </Row>
        ))}
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
