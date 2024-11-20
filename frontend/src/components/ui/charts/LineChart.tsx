"use client"

import * as React from "react"
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/Card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts/charts"

interface LineChartProps {
  data: Array<{ [key: string]: string | number }>
  xAxisKey: string
  yAxisKey: string
  title?: string
  description?: string
}

export function LineChart({ data, xAxisKey, yAxisKey, title, description }: LineChartProps) {
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
            <RechartsLineChart data={data}>
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey={yAxisKey} stroke="var(--color-chart-1)" strokeWidth={2} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}