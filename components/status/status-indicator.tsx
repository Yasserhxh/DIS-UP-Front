import { cn } from "@/lib/utils"

type StatusType = "online" | "offline" | "away" | "busy" | "success" | "warning" | "error"

interface StatusIndicatorProps {
  status: StatusType
  size?: "sm" | "md" | "lg"
  pulse?: boolean
  className?: string
}

export function StatusIndicator({ status, size = "md", pulse = false, className }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full",
        size === "sm" && "h-2 w-2",
        size === "md" && "h-3 w-3",
        size === "lg" && "h-4 w-4",
        status === "online" && "bg-green-500",
        status === "offline" && "bg-gray-400",
        status === "away" && "bg-amber-500",
        status === "busy" && "bg-red-500",
        status === "success" && "bg-green-500",
        status === "warning" && "bg-amber-500",
        status === "error" && "bg-red-500",
        pulse && "animate-pulse",
        className,
      )}
    />
  )
}

