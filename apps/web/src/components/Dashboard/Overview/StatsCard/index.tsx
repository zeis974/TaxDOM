import { Card, CardContent, CardTitle, CardValue } from "./StatsCard.styled"

interface StatsCardProps {
  title: string
  value: number | string
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardValue>{value}</CardValue>
      </CardContent>
    </Card>
  )
}
