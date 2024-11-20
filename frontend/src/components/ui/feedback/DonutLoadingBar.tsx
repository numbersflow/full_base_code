import * as React from "react"
import { cn } from "@/lib/utils"

interface DonutLoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number
  size?: "sm" | "md" | "lg"
  color?: string
}

export function DonutLoadingBar({
  progress,
  size = "md",
  color = "text-primary",
  className,
  ...props
}: DonutLoadingBarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const strokeWidth = {
    sm: 2,
    md: 4,
    lg: 6,
  }

  const circumference = 2 * Math.PI * 18
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={cn("relative", sizeClasses[size], className)} {...props}>
      <svg className="w-full h-full" viewBox="0 0 40 40">
        <circle
          className="text-muted-foreground"
          strokeWidth={strokeWidth[size]}
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
        <circle
          className={cn("transition-all duration-300 ease-in-out", color)}
          strokeWidth={strokeWidth[size]}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
          transform="rotate(-90 20 20)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium">{`${Math.round(progress)}%`}</span>
      </div>
    </div>
  )
}