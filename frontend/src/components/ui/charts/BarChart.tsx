"use client"

import * as React from "react"
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/Card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts/charts"

interface BarChartProps {
  data: Array<{ [key: string]: string | number }>
  xAxisKey: string
  yAxisKey: string
  title?: string
  description?: string
}

export function BarChart({ data, xAxisKey, yAxisKey, title, description }: BarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            [yAxisKey]: {
              label: yAxisKey,
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data}>
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey={yAxisKey} fill="var(--color-chart-1)" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}