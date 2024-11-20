import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

const floatingButtonVariants = cva(
  "rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background transition-all hover:scale-110 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "bg-green-500 text-white hover:bg-green-600",
        danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-14 w-14",
        sm: "h-10 w-10",
        lg: "h-16 w-16",
      },
      position: {
        "bottom-right": "fixed bottom-6 right-6",
        "bottom-left": "fixed bottom-6 left-6",
        "top-right": "fixed top-6 right-6",
        "top-left": "fixed top-6 left-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "bottom-right",
    },
  }
)

interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof floatingButtonVariants> {
  icon?: React.ReactNode
}

export const FloatingButton = React.forwardRef<HTMLButtonElement, FloatingButtonProps>(
  ({ className, variant, size, position, icon, ...props }, ref) => {
    return (
      <button
        className={cn(floatingButtonVariants({ variant, size, position, className }))}
        ref={ref}
        {...props}
      >
        {icon || <Plus className="h-6 w-6" />}
      </button>
    )
  }
)

FloatingButton.displayName = "FloatingButton"