import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputAddonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "right"
}

const InputAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, position = "left", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center px-3 py-2 text-sm border border-input bg-muted",
          position === "left" && "rounded-l-md border-r-0",
          position === "right" && "rounded-r-md border-l-0",
          className
        )}
        {...props}
      />
    )
  }
)
InputAddon.displayName = "InputAddon"

export { InputAddon }