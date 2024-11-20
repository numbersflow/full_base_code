import React from 'react'
import { Container } from '@/components/ui/layout/Container'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/layout/Card'
import { Button } from '@/components/ui/buttons/Button'

export default function Page() {
  const plans = [
    { name: 'Basic', price: '9', features: ['5 projects', '10 users', 'Basic support'] },
    { name: 'Pro', price: '29', features: ['Unlimited projects', '50 users', 'Priority support', 'Advanced analytics'] },
    { name: 'Enterprise', price: '99', features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SLA'] },
  ]

  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-10">Pricing Plans</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>Perfect for {plan.name.toLowerCase()} users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">${plan.price}<span className="text-sm font-normal">/month</span></p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose {plan.name}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  )
}