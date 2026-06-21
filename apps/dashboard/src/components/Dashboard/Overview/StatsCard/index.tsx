import { Card, CardContent, CardLink, CardTitle, CardValue } from "./StatsCard.styled"

interface StatsCardProps {
  title: string
  value: number | string
  /** Si fourni, la carte devient un lien cliquable vers la page correspondante. */
  to?: string
}

export default function StatsCard({ title, value, to }: StatsCardProps) {
  const content = (
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
    </CardContent>
  )

  if (to) {
    return (
      <CardLink to={to} aria-label={`${title} : ${value}`}>
        {content}
      </CardLink>
    )
  }

  return <Card>{content}</Card>
}
