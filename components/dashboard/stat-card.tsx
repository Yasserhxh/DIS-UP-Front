import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string | number
    direction: "up" | "down" | "neutral"
    label?: string
  }
  iconColor?: string
  bgColor?: string
  className?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "text-primary",
  bgColor = "bg-primary/10",
  className,
}: StatCardProps) {
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
        {trend && (
          <p
            className={cn(
              "text-xs",
              trend.direction === "up"
                ? "text-green-500"
                : trend.direction === "down"
                  ? "text-amber-500"
                  : "text-muted-foreground",
            )}
          >
            {trend.value} {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

