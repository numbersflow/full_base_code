import * as React from "react"
import { Button } from "./Button"
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/DropdownMenu"

interface DropdownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  items: { label: string; onClick: () => void }[]
}

export const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  ({ children, items, ...props }, ref) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button ref={ref} {...props}>
            {children}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {items.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.onClick}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)
DropdownButton.displayName = "DropdownButton"