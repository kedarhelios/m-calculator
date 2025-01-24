import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

interface PostCounterProps {
  readonly label: string
  readonly count: number
}

export function PostCounter({ label, count }: PostCounterProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  )
}

