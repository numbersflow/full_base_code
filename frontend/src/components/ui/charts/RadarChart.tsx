"use client"

import * as React from "react"
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/Card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/charts/charts"

interface RadarChartProps {
  data: Array<{ [key: string]: string | number }>
  dataKey: string
  title?: string
  description?: string
}

export function RadarChart({ data, dataKey, title, description }: RadarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            [dataKey]: {
              label: dataKey,
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name={dataKey} dataKey={dataKey} stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.6} />
                <Tooltip content={<ChartTooltipContent />} />
            </RechartsRadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}