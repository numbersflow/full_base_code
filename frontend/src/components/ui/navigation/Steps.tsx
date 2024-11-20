import * as React from "react"
import { Check } from 'lucide-react'

import { cn } from "@/lib/utils"

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: { title: string; description?: string }[]
  currentStep: number
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, steps, currentStep, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              "flex items-center",
              index !== steps.length - 1 ? "flex-1" : ""
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2",
                  index < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-500"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <p
                className={cn(
                  "mt-2 text-xs",
                  index <= currentStep ? "text-primary" : "text-gray-500"
                )}
              >
                {step.title}
              </p>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-full",
                  index < currentStep ? "bg-primary" : "bg-gray-300"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
)
Steps.displayName = "Steps"

export { Steps }