import * as React from "react"
import { cn } from "@/lib/utils"

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  inline?: boolean
  direction?: "row" | "row-reverse" | "column" | "column-reverse"
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly"
  align?: "start" | "end" | "center" | "baseline" | "stretch"
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, inline = false, direction = "row", wrap = "nowrap", justify = "start", align = "stretch", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          inline ? "inline-flex" : "flex",
          {
            "flex-row": direction === "row",
            "flex-row-reverse": direction === "row-reverse",
            "flex-col": direction === "column",
            "flex-col-reverse": direction === "column-reverse",
            "flex-nowrap": wrap === "nowrap",
            "flex-wrap": wrap === "wrap",
            "flex-wrap-reverse": wrap === "wrap-reverse",
            "justify-start": justify === "start",
            "justify-end": justify === "end",
            "justify-center": justify === "center",
            "justify-between": justify === "between",
            "justify-around": justify === "around",
            "justify-evenly": justify === "evenly",
            "items-start": align === "start",
            "items-end": align === "end",
            "items-center": align === "center",
            "items-baseline": align === "baseline",
            "items-stretch": align === "stretch",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Flex.displayName = "Flex"

export { Flex }