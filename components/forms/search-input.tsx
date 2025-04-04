import { Search } from "lucide-react"
import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchInputProps extends InputProps {
  className?: string
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input className="pl-10 rounded-xl" placeholder="Rechercher..." {...props} />
    </div>
  )
}

