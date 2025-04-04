import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  icon?: ReactNode
  change?: {
    value: string | number
    type: "increase" | "decrease" | "neutral"
  }
  footer?: ReactNode
  className?: string
  valueClassName?: string
  iconClassName?: string
}

export function KPICard({
  title,
  value,
  icon,
  change,
  footer,
  className,
  valueClassName,
  iconClassName,
}: KPICardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className={cn("p-2 rounded-full bg-primary/10", iconClassName)}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
        {change && (
          <p
            className={cn(
              "text-xs mt-1",
              change.type === "increase"
                ? "text-green-500"
                : change.type === "decrease"
                  ? "text-red-500"
                  : "text-muted-foreground",
            )}
          >
            {change.value}
          </p>
        )}
        {footer && <div className="mt-2">{footer}</div>}
      </CardContent>
    </Card>
  )
}

