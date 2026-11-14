import { MotionConfig, useReducedMotion, type Variants } from "motion/react"
import * as m from "motion/react-m"
import type { JSX } from "react"
import { useTypewriter } from "@/hooks/useTypewriter"
import {
  BackCard,
  Bar,
  Card,
  Caret,
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
  Traveler,
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

const ease = [0.22, 1, 0.36, 1] as const

// Each variant takes its start delay (seconds) through `custom`, so every scene reads as a timeline
const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.45, ease } }),
}

const slideIn: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: (delay = 0) => ({ opacity: 1, x: 0, transition: { delay, duration: 0.5, ease } }),
}

const enter: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: (delay = 0) => ({ opacity: 1, x: 0, transition: { delay, duration: 0.3, ease } }),
}

const growX: Variants = {
  hidden: { scaleX: 0 },
  show: (delay = 0) => ({ scaleX: 1, transition: { delay, duration: 0.6, ease } }),
}

const growY: Variants = {
  hidden: { scaleY: 0 },
  show: (delay = 0) => ({ scaleY: 1, transition: { delay, duration: 0.55, ease } }),
}

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay, type: "spring", stiffness: 420, damping: 20 },
  }),
}

function Typed({ text, delay }: { text: string; delay: number }) {
  return useTypewriter(text, delay * 1000)
}

// Mock screens only: they never show figures, so nothing reads as a real rate
function Body({ kind }: { kind: IllustrationKind }) {
  const reduce = useReducedMotion()

  switch (kind) {
    case "rates":
      return (
        <>
          <Field variants={rise} custom={0.2}>
            <Typed text="Smartphone" delay={0.4} />
            <Caret
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 1,
                times: [0, 0.5, 0.5, 1],
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </Field>
          <Chips>
            <Chip variants={pop} custom={1}>
              France
            </Chip>
            <m.span variants={pop} custom={1.05}>
              →
            </m.span>
            <Chip data-tone="accent" variants={pop} custom={1.1}>
              La Réunion
            </Chip>
          </Chips>
          {["Octroi de mer", "OMR", "TVA"].map((label, i) => (
            <Row key={label} variants={enter} custom={1.2 + i * 0.08}>
              <Label>{label}</Label>
              <Bar
                data-tone="accent"
                data-w={["md", "sm", "xl"][i]}
                variants={growX}
                custom={1.3 + i * 0.1}
              />
            </Row>
          ))}
        </>
      )
    case "parcel":
      return (
        <>
          {["Casque audio", "Baskets", "Livres"].map((label, i) => (
            <Row key={label} variants={enter} custom={0.25 + i * 0.1}>
              <Item>
                <Thumb />
                <Label>{label}</Label>
              </Item>
              <Bar data-w={i === 1 ? "sm" : "md"} variants={growX} custom={0.4 + i * 0.1} />
            </Row>
          ))}
          <Row variants={enter} custom={0.55}>
            <Label data-tone="muted">Transport et taxes</Label>
            <Bar data-w="sm" variants={growX} custom={0.7} />
          </Row>
          <Divider variants={growX} custom={0.8} />
          <Row variants={enter} custom={0.9}>
            <Label data-weight="bold">Total</Label>
            <Bar
              data-tone="accent"
              data-w="xl"
              data-h="lg"
              data-shine
              variants={growX}
              custom={1}
            />
          </Row>
        </>
      )
    case "compare":
      return (
        <Columns>
          {compared.map((product, i) => (
            <Column key={product.label} variants={rise} custom={0.2 + i * 0.12}>
              <Label data-weight="bold">{product.label}</Label>
              <Chart>
                {product.heights.map((h, j) => (
                  <Pillar
                    // biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars
                    key={j}
                    data-h={h}
                    data-tone={i === 0 ? "accent" : undefined}
                    variants={growY}
                    custom={0.45 + j * 0.1 + i * 0.15}
                  />
                ))}
              </Chart>
              <Bar data-w={i === 0 ? "md" : "sm"} variants={growX} custom={0.9 + i * 0.1} />
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
      ].map(([from, to], i) => (
        <Route key={from} variants={enter} custom={0.2 + i * 0.08}>
          <Dot data-tone="neutral" />
          <Label data-tone="muted">{from}</Label>
          <Line variants={growX} custom={0.35 + i * 0.08}>
            {!reduce && (
              <Traveler
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.6,
                  ease: "easeInOut",
                  delay: 1 + i * 0.35,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1.2,
                }}
              />
            )}
          </Line>
          <Label data-weight="bold">{to}</Label>
          <Dot variants={pop} custom={0.8 + i * 0.08} />
        </Route>
      ))
    case "territories":
      return ["Guadeloupe", "Martinique", "Guyane", "La Réunion", "Mayotte"].map((label, i) => (
        <ChartRow key={label} variants={enter} custom={0.2 + i * 0.07}>
          <Label>{label}</Label>
          <Bar
            data-tone="accent"
            data-w={["xl", "md", "xl", "md", "sm"][i]}
            variants={growX}
            custom={0.35 + i * 0.07}
          />
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
          ].map((label, i) => (
            // Diagonal wave: tiles appear row + column order
            <Tile key={label} variants={pop} custom={0.2 + (Math.floor(i / 3) + (i % 3)) * 0.07}>
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
    // Users asking for less motion keep the fades but skip the movement
    <MotionConfig reducedMotion="user">
      <Scene data-variant={accents[kind]} aria-hidden="true" initial="hidden" animate="show">
        <BackCard variants={slideIn} custom={0.08}>
          <Bar data-w="md" />
          {["xl", "md", "xl"].map((w, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative bars
            <Row key={i}>
              <Bar data-w="full" />
              <Bar data-w={w} />
            </Row>
          ))}
        </BackCard>
        <Card variants={rise}>
          <Header>
            {icon}
            {title}
          </Header>
          <Body kind={kind} />
        </Card>
      </Scene>
    </MotionConfig>
  )
}
