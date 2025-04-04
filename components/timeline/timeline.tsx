import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TimelineItemProps {
  title: string
  time: string
  icon?: ReactNode
  content: ReactNode
  isLast?: boolean
  className?: string
}

export function TimelineItem({ title, time, icon, content, isLast = false, className }: TimelineItemProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">{icon}</div>
        {!isLast && <div className="h-full w-px bg-border mt-2"></div>}
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
        <div className="mt-2">{content}</div>
      </div>
    </div>
  )
}

interface TimelineProps {
  children: ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  return <div className={cn("space-y-0", className)}>{children}</div>
}

