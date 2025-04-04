import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType = "success" | "warning" | "error" | "info" | "pending" | "default"

interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: StatusType
  text: string
}

export function StatusBadge({ status, text, className, ...props }: StatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "capitalize",
        status === "success" && "bg-green-500 hover:bg-green-600",
        status === "warning" && "bg-amber-500 hover:bg-amber-600",
        status === "error" && "bg-destructive hover:bg-destructive/90",
        status === "info" && "bg-blue-500 hover:bg-blue-600",
        status === "pending" && "bg-purple-500 hover:bg-purple-600",
        className,
      )}
      {...props}
    >
      {text}
    </Badge>
  )
}

