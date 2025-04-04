import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItemProps {
  href?: string
  label: string
  icon?: ReactNode
  isCurrent?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItemProps[]
  className?: string
  homeHref?: string
  showHomeIcon?: boolean
}

export function Breadcrumb({ items, className, homeHref = "/dashboard", showHomeIcon = true }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center space-x-2">
        {showHomeIcon && (
          <>
            <li>
              <Link
                href={homeHref}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">Accueil</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </li>
          </>
        )}

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />}

            {item.href && !item.isCurrent ? (
              <Link
                href={item.href}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "flex items-center",
                  item.isCurrent ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

