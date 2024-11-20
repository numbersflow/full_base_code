import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const listVariants = cva("list-none", {
  variants: {
    variant: {
      default: "",
      ordered: "list-decimal",
      unordered: "list-disc",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant, ...props }, ref) => {
    const Comp = variant === "ordered" ? "ol" : "ul"
    return (
      <Comp
        ref={ref}
        className={cn(listVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
List.displayName = "List"

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("my-1", className)} {...props} />
))
ListItem.displayName = "ListItem"

export { List, ListItem }