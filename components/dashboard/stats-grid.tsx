import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatsGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4 | 5
  className?: string
}

export function StatsGrid({ children, columns = 4, className }: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-3",
        columns === 4 && "md:grid-cols-2 lg:grid-cols-4",
        columns === 5 && "md:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  )
}

