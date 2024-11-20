import * as React from "react"
import { cn } from "@/lib/utils"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = "div", className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("box", className)}
        {...props}
      />
    )
  }
)
Box.displayName = "Box"

export { Box }