import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex", className)}
        {...props}
      />
    )
  }
)
InputGroup.displayName = "InputGroup"

export { InputGroup }