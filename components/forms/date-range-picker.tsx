"use client"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  setDateRange: (dateRange: DateRange | undefined) => void
  className?: string
  align?: "center" | "start" | "end"
}

export function DateRangePicker({ dateRange, setDateRange, className, align = "start" }: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full h-12 justify-start text-left font-normal rounded-xl py-3",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd LLL y", { locale: fr })} -{" "}
                  {format(dateRange.to, "dd LLL y", { locale: fr })}
                </>
              ) : (
                format(dateRange.from, "dd LLL y", { locale: fr })
              )
            ) : (
              <span>Sélectionner une période</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            locale={fr}
          />
          <div className="flex items-center justify-between p-3 border-t">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const today = new Date()
                  setDateRange({
                    from: today,
                    to: today,
                  })
                }}
              >
                Aujourd'hui
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const today = new Date()
                  const weekAgo = addDays(today, -7)
                  setDateRange({
                    from: weekAgo,
                    to: today,
                  })
                }}
              >
                7 derniers jours
              </Button>
            </div>
            <Button
              size="sm"
              onClick={() => {
                setDateRange(undefined)
              }}
            >
              Réinitialiser
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

