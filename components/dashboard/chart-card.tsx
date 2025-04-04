import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartCardProps {
  title: string
  description?: string
  children: ReactNode
  height?: number
  footer?: ReactNode
  className?: string
}

export function ChartCard({ title, description, children, height = 300, footer, className }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }} className="w-full">
          {children}
        </div>
        {footer && <div className="mt-4">{footer}</div>}
      </CardContent>
    </Card>
  )
}

