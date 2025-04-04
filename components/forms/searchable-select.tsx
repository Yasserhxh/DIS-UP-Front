"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface Option {
  value: string
  label: string
}

interface SearchableSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
  clearable?: boolean
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Sélectionner une option",
  emptyMessage = "Aucun résultat trouvé.",
  className,
  clearable = true,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedOption = React.useMemo(() => options.find((option) => option.value === value), [options, value])

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full h-12 justify-between rounded-xl py-3", !value && "text-muted-foreground", className)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <div className="flex items-center gap-1">
            {clearable && value && (
              <button type="button" onClick={handleClear} className="rounded-full hover:bg-muted p-1">
                <X className="h-4 w-4 opacity-50 hover:opacity-100" />
                <span className="sr-only">Clear</span>
              </button>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command
          filter={(value, search) => {
            // Custom filter function that's more lenient
            if (!search) return 1
            const label = value.toLowerCase()
            const query = search.toLowerCase()

            // Check if the label includes the search query
            if (label.includes(query)) return 1

            // Check for partial matches
            const words = label.split(" ")
            for (const word of words) {
              if (word.startsWith(query)) return 1
            }

            return 0
          }}
        >
          <CommandInput placeholder="Rechercher..." />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

