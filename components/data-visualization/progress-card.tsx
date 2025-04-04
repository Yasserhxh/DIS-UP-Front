import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ProgressCardProps {
  title: string
  value: number
  max: number
  icon?: ReactNode
  description?: string
  progressColor?: "default" | "success" | "warning" | "danger"
  className?: string
}

export function ProgressCard({
  title,
  value,
  max,
  icon,
  description,
  progressColor = "default",
  className,
}: ProgressCardProps) {
  const percentage = Math.round((value / max) * 100)

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-1">
          <span className="text-2xl font-bold">
            {value}/{max}
          </span>
          <span className="text-sm text-muted-foreground">{percentage}%</span>
        </div>
        <Progress
          value={percentage}
          className={cn(
            "h-2",
            progressColor === "success" && "bg-green-100 [&>div]:bg-green-500",
            progressColor === "warning" && "bg-amber-100 [&>div]:bg-amber-500",
            progressColor === "danger" && "bg-red-100 [&>div]:bg-red-500",
          )}
        />
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </CardContent>
    </Card>
  )
}

