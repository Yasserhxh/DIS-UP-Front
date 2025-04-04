"use client"

import type { ReactNode } from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ChartType = "bar" | "line"

interface ComparisonChartProps {
  title: string
  description?: string
  data: any[]
  type?: ChartType
  xAxisKey: string
  series: {
    name: string
    key: string
    color: string
  }[]
  height?: number
  className?: string
  footer?: ReactNode
  grid?: boolean
  legend?: boolean
}

export function ComparisonChart({
  title,
  description,
  data,
  type = "bar",
  xAxisKey,
  series,
  height = 300,
  className,
  footer,
  grid = true,
  legend = true,
}: ComparisonChartProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === "bar" ? (
              <BarChart data={data}>
                <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip />
                {grid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
                {legend && <Legend />}
                {series.map((s) => (
                  <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            ) : (
              <LineChart data={data}>
                <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip />
                {grid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
                {legend && <Legend />}
                {series.map((s) => (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.name}
                    stroke={s.color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        {footer && <div className="mt-4">{footer}</div>}
      </CardContent>
    </Card>
  )
}

