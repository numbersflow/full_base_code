import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/Card"

interface MapProps {
  title?: string
  description?: string
}

export function Map({ title, description }: MapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            <path
              d="M781.68,324.27,775.1,332.5l-8.83,6.86,2.15,6.86-7.81,7.64-4.9,7.64-9.85,5.88,3.58,3.92-2.15,6.86-5.39,6.37,1.66,5.39-4.9,5.39-7.81,3.92-4.41,6.86-6.37,0.49-5.39,4.41-7.32,2.94-8.31,8.82-7.81.98-4.41-2.94-5.39-6.37-3.43-6.86-5.88-1.96-4.9-2.45-3.43-6.86-6.37-4.41-3.43,1.47-4.41-2.94-6.37-1.47-3.43-2.45-3.92-8.33-8.31,1.47-4.41,2.94-6.86-0.98-3.43-3.43-3.92-6.37-1.47-6.37,1.47-4.41,4.41-2.94,0.49-4.9-3.43-6.86-0.98-10.78,3.92-9.31,2.45-9.8,2.45-5.88,4.41,2.45,7.32,2.45,7.32-1.47,2.45-3.43,6.37,0.49,2.94,5.39,4.41,1.47,11.27-2.45,6.37,2.45,6.37,0.49,6.37-1.47,3.43,1.47,3.92,6.86,1.47,6.37,3.43,2.94,6.86-2.45,4.41,0.49h7.32l5.88,5.39,6.37,0.49,2.94-1.96,3.92,3.92,5.39,3.43,6.37,4.41,5.39-.49,2.45-2.45,6.37,1.47,2.45,2.45,3.43,6.86,5.39,6.37,7.32,3.92,5.88,0.49,2.45-2.45,6.86-0.98,4.41,4.41,7.32,2.94,1.47,2.45Z"
              fill="hsl(var(--muted))"
            />
            {/* Add more path elements for other continents/countries */}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}