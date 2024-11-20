"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode
  defaultOpen?: boolean
}

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  ({ className, children, title, defaultOpen = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
      <div ref={ref} className={cn("border rounded-lg", className)} {...props}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-2 font-medium transition-all hover:underline"
          aria-expanded={isOpen}
        >
          {title}
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <div className="px-4 pb-4 pt-0">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
Collapse.displayName = "Collapse"

export { Collapse }