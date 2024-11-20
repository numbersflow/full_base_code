import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const timelineVariants = cva("relative", {
  variants: {
    variant: {
      default: "before:absolute before:left-4 before:h-full before:w-0.5 before:bg-border",
      centered: "before:absolute before:left-1/2 before:h-full before:w-0.5 before:bg-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timelineVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Timeline.displayName = "Timeline"

const timelineItemVariants = cva("relative pb-8", {
  variants: {
    variant: {
      default: "pl-10",
      centered: "left-1/2 pl-10 even:left-auto even:-translate-x-full even:pl-0 even:pr-10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineItemVariants> {}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timelineItemVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
TimelineItem.displayName = "TimelineItem"

const TimelineDot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-2 top-1 h-4 w-4 rounded-full border border-background bg-border",
      className
    )}
    {...props}
  />
))
TimelineDot.displayName = "TimelineDot"

export { Timeline, TimelineItem, TimelineDot }