'use client'

import dynamic from 'next/dynamic'
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/Card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts/charts"

// 동적 임포트로 recharts 컴포넌트 로드
const RechartsAreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false })
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false })

interface AreaChartProps {
  data: Array<{ [key: string]: string | number }>
  xAxisKey: string
  yAxisKey: string
  title?: string
  description?: string
}

export function AreaChart({ data, xAxisKey, yAxisKey, title, description }: AreaChartProps) {
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
            <RechartsAreaChart data={data}>
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey={yAxisKey} 
                stroke="var(--color-chart-1)" 
                fill="var(--color-chart-1)" 
                fillOpacity={0.2} 
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}