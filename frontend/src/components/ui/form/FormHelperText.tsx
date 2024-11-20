import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormHelperText = React.forwardRef<
  HTMLParagraphElement,
  FormHelperTextProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormHelperText.displayName = "FormHelperText"

export { FormHelperText }