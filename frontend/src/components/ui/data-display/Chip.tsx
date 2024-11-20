import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from 'lucide-react'

import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  onDelete?: () => void
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, onDelete, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant }), className)}
        {...props}
      >
        {children}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="ml-1 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  }
)
Chip.displayName = "Chip"

export { Chip, chipVariants }