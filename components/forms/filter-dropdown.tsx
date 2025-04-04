"use client"

import React from "react"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterOption {
  label: string
  value: string
  onClick: () => void
}

interface FilterGroup {
  label: string
  options: FilterOption[]
}

interface FilterDropdownProps {
  groups: FilterGroup[]
  buttonVariant?: "default" | "outline" | "secondary"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  align?: "start" | "center" | "end"
  className?: string
}

export function FilterDropdown({
  groups,
  buttonVariant = "outline",
  buttonSize = "sm",
  align = "end",
  className,
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} className={className}>
          <Filter className="mr-2 h-4 w-4" />
          Filtrer
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {groups.map((group, index) => (
          <React.Fragment key={index}>
            <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {group.options.map((option, optionIndex) => (
              <DropdownMenuItem key={optionIndex} onClick={option.onClick}>
                {option.label}
              </DropdownMenuItem>
            ))}
            {index < groups.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

