"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/Card"


interface GaugeProps {
  value: number
  min?: number
  max?: number
  title?: string
  description?: string
}

export function Gauge({ value, min = 0, max = 100, title, description }: GaugeProps) {
  const data = [
    { name: "Value", value: value - min },
    { name: "Remaining", value: max - value },
  ]

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--muted))"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="100%"
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold">{value}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}