import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  size?: "small" | "medium" | "large"
  align?: "start" | "end" | "center" | "baseline"
}

const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  ({ className, direction = "horizontal", size = "small", align = "center", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          {
            "flex-row": direction === "horizontal",
            "flex-col": direction === "vertical",
            "gap-2": size === "small",
            "gap-4": size === "medium",
            "gap-6": size === "large",
            "items-start": align === "start",
            "items-end": align === "end",
            "items-center": align === "center",
            "items-baseline": align === "baseline",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Space.displayName = "Space"

export { Space }