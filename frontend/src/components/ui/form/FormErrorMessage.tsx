import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  FormErrorMessageProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  )
})
FormErrorMessage.displayName = "FormErrorMessage"

export { FormErrorMessage }