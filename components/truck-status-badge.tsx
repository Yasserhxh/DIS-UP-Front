import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type TruckStatus = "waiting" | "in-transit" | "loaded" | "departed" | "delayed" | "issue"

interface TruckStatusBadgeProps {
  status: TruckStatus
  className?: string
}

const statusTranslations = {
  waiting: "En attente",
  "in-transit": "En transit",
  loaded: "Chargé",
  departed: "Parti",
  delayed: "Retardé",
  issue: "Problème",
}

export function TruckStatusBadge({ status, className }: TruckStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "capitalize",
        status === "waiting" && "bg-blue-500 hover:bg-blue-600",
        status === "in-transit" && "bg-amber-500 hover:bg-amber-600",
        status === "loaded" && "bg-green-500 hover:bg-green-600",
        status === "departed" && "bg-purple-500 hover:bg-purple-600",
        status === "delayed" && "bg-primary hover:bg-primary/90",
        status === "issue" && "bg-destructive hover:bg-destructive/90",
        className,
      )}
    >
      {statusTranslations[status] || status.replace("-", " ")}
    </Badge>
  )
}

