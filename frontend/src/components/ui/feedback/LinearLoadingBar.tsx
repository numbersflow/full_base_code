import * as React from "react"
import { cn } from "@/lib/utils"

interface LinearLoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number
  size?: "sm" | "md" | "lg"
  color?: string
}

export function LinearLoadingBar({
  progress,
  size = "md",
  color = "bg-primary",
  className,
  ...props
}: LinearLoadingBarProps) {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }

  return (
    <div
      className={cn("w-full bg-muted-foreground/20 overflow-hidden rounded-full", sizeClasses[size], className)}
      {...props}
    >
      <div
        className={cn("h-full transition-all duration-300 ease-in-out rounded-full", color)}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}