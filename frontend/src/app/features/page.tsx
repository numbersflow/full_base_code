import React from 'react'
import { Container } from '@/components/ui/layout/Container'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/layout/Card'
import { Badge } from '@/components/ui/data-display/Badge'

export default function Page() {
  const features = [
    { title: 'Responsive Design', description: 'Our components work seamlessly on all devices', badge: 'Core' },
    { title: 'Customizable Themes', description: 'Easily change colors and styles to match your brand', badge: 'Pro' },
    { title: 'Accessibility', description: 'Built with a11y in mind for inclusive user experiences', badge: 'Core' },
    { title: 'Performance Optimized', description: 'Lightweight components for fast loading times', badge: 'Core' },
    { title: 'Regular Updates', description: 'New components and improvements added frequently', badge: 'Pro' },
    { title: 'Expert Support', description: 'Get help from our team of UI/UX specialists', badge: 'Enterprise' },
  ]

  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-10">Features</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{feature.title}</CardTitle>
                <Badge>{feature.badge}</Badge>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Container>
  )
}