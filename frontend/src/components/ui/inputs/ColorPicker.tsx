"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/feedback/Popover"
import { cn } from "@/lib/utils"

interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  presetColors?: string[]
}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ className, presetColors = [], ...props }, ref) => {
    const [color, setColor] = React.useState(props.defaultValue as string || "#000000")

    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-10 h-10 rounded-md border border-input",
              className
            )}
            style={{ backgroundColor: color }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="flex flex-col space-y-2">
            <input
              ref={ref}
              type="color"
              className="w-full h-10"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              {...props}
            />
            {presetColors.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className="w-6 h-6 rounded-md border border-input"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => setColor(presetColor)}
                  />
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
ColorPicker.displayName = "ColorPicker"

export { ColorPicker }