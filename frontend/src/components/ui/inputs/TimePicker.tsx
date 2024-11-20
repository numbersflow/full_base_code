"use client"

import * as React from "react"
import { Clock } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/feedback/Popover"
import { Button } from "@/components/ui/buttons/Button"
import { Input } from "@/components/ui/inputs/Input"
import { cn } from "@/lib/utils"

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)

  const [hour, setHour] = React.useState(date ? date.getHours() : 0)
  const [minute, setMinute] = React.useState(date ? date.getMinutes() : 0)
  const [second, setSecond] = React.useState(date ? date.getSeconds() : 0)

  const handleTimeChange = () => {
    if (!date) return

    const newDate = new Date(date)
    newDate.setHours(hour)
    newDate.setMinutes(minute)
    newDate.setSeconds(second)
    setDate(newDate)
  }

  React.useEffect(() => {
    handleTimeChange()
  }, [hour, minute, second])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {date ? (
            date.toLocaleTimeString()
          ) : (
            <span>Pick a time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex items-end gap-2 p-3">
          <div className="grid gap-1 text-center">
            <div className="text-sm font-medium">Hour</div>
            <Input
              ref={hourRef}
              type="number"
              min={0}
              max={23}
              className="w-[64px]"
              value={hour}
              onChange={(e) => setHour(parseInt(e.target.value))}
            />
          </div>
          <div className="grid gap-1 text-center">
            <div className="text-sm font-medium">Minute</div>
            <Input
              ref={minuteRef}
              type="number"
              min={0}
              max={59}
              className="w-[64px]"
              value={minute}
              onChange={(e) => setMinute(parseInt(e.target.value))}
            />
          </div>
          <div className="grid gap-1 text-center">
            <div className="text-sm font-medium">Second</div>
            <Input
              ref={secondRef}
              type="number"
              min={0}
              max={59}
              className="w-[64px]"
              value={second}
              onChange={(e) => setSecond(parseInt(e.target.value))}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}