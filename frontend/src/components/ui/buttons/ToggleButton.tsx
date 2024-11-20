import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const toggleButtonVariants = cva(
  "inline-flex items-center justify-between rounded-md text-sm font-medium ring-offset-background transition-all duration-200 w-full",
  {
    variants: {
      variant: {
        default: "bg-background hover:bg-accent",
        outline: "border border-input hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleButtonVariants> {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
  content: React.ReactNode // 토글될 내용
}

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ className, variant, size, pressed, onPressedChange, content, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <button
          type="button"
          className={cn(toggleButtonVariants({ variant, size, className }))}
          ref={ref}
          data-state={pressed ? "on" : "off"}
          aria-expanded={pressed}
          onClick={() => onPressedChange(!pressed)}
          {...props}
        >
          <span>{children}</span>
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              pressed && "transform rotate-180"
            )} 
          />
        </button>
        {pressed && (
          <div className="mt-2 rounded-md border bg-background p-4 shadow-sm">
            {content}
          </div>
        )}
      </div>
    )
  }
)

ToggleButton.displayName = "ToggleButton"