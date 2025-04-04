import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatusCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  className?: string
  iconColor?: string
  bgColor?: string
  trend?: "up" | "down" | "neutral"
}

export function StatusCard({
  title,
  value,
  icon: Icon,
  description,
  className,
  iconColor = "text-primary",
  bgColor = "bg-primary/10",
  trend,
}: StatusCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("p-2 rounded-full", bgColor)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p
            className={cn(
              "text-xs",
              trend === "up" ? "text-green-500" : trend === "down" ? "text-amber-500" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

