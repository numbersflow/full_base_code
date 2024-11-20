import * as React from "react"
import { cn } from "@/lib/utils"

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number
  gap?: number
  rowGap?: number
  colGap?: number
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap, rowGap, colGap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          {
            [`grid-cols-${cols}`]: cols,
            [`gap-${gap}`]: gap !== undefined,
            [`row-gap-${rowGap}`]: rowGap !== undefined,
            [`col-gap-${colGap}`]: colGap !== undefined,
          },
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid }