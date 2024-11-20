import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface FormControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean
}

const FormControl = React.forwardRef<HTMLInputElement, FormControlProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input"
    return (
      <Comp
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
FormControl.displayName = "FormControl"

export { FormControl }