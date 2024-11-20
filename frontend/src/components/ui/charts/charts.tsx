import * as React from "react"
import { TooltipProps } from "recharts"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) {
  const colors = Object.entries(config).reduce((acc, [key, value]) => {
    acc[`--color-${key}`] = value.color
    return acc
  }, {} as Record<string, string>)

  return (
    <div className={cn("", className)} style={colors} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipProps extends TooltipProps<number, string> {
  config: ChartConfig
}

export function ChartTooltip({ active, payload, label, config }: ChartTooltipProps) {
  if (!active || !payload) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="font-medium">{label}</div>
        {payload.map(({ dataKey, value }) => (
          <div key={dataKey} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: config[dataKey]?.color }}
              />
              <span className="text-sm text-muted-foreground">
                {config[dataKey]?.label ?? dataKey}
              </span>
            </div>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartTooltipContent({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="font-medium">{label}</div>
        {payload.map(({ dataKey, value }) => (
          <div key={dataKey} className="flex items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground">{dataKey}</span>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}