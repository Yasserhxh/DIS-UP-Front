"use client"

import type { ReactNode } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DistributionChartProps {
  title: string
  description?: string
  data: {
    name: string
    value: number
    color: string
  }[]
  height?: number
  className?: string
  footer?: ReactNode
  showLegend?: boolean
  showLabels?: boolean
  innerRadius?: number
  outerRadius?: number
}

export function DistributionChart({
  title,
  description,
  data,
  height = 300,
  className,
  footer,
  showLegend = true,
  showLabels = true,
  innerRadius = 0,
  outerRadius = 80,
}: DistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={showLabels ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : undefined}
                labelLine={showLabels}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, "Valeur"]} />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        </div>
        {footer && <div className="mt-4">{footer}</div>}
      </CardContent>
    </Card>
  )
}

