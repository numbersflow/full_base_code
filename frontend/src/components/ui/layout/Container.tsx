import * as React from "react"
import { cn } from "@/lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = "lg", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          {
            "max-w-screen-sm": maxWidth === "sm",
            "max-w-screen-md": maxWidth === "md",
            "max-w-screen-lg": maxWidth === "lg",
            "max-w-screen-xl": maxWidth === "xl",
            "max-w-screen-2xl": maxWidth === "2xl",
            "max-w-full": maxWidth === "full",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }